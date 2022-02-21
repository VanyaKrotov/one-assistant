import { isToday } from 'date-fns';
import { Unsubscribe } from 'firebase/auth';
import {
  set,
  ref,
  DatabaseReference,
  child,
  onValue,
  update,
  remove,
  get,
} from 'firebase/database';
import { makeAutoObservable, reaction } from 'mobx';
import { nanoid } from 'nanoid';
import { db } from 'renderer/firebase';
import { DeleteConfirmation } from 'renderer/modals';
import { ModalNames } from 'types/Modal';

import Note, { NoteType, SharedRules, Viewer } from 'types/Note';

import LocalDataStore from '../local-data';
import ModalsStore from '../modals';
import ProfileStore from '../profile';

class NotesStore {
  private pagesMap: Record<string, Note> | null = null;

  private isSyncNotes = false;

  public ref: DatabaseReference = ref(db, 'notes');

  private unsubscribe: Unsubscribe | null = null;

  constructor(
    private readonly profile: ProfileStore,
    private readonly storage: LocalDataStore,
    private readonly modals: ModalsStore
  ) {
    makeAutoObservable(this);

    reaction(
      () => this.isSyncNotes,
      (isSyncNotes) => {
        if (!isSyncNotes) {
          return;
        }

        if (!this.dailyPages.find(({ dateCreated }) => isToday(dateCreated))) {
          this.addNote('autocreated', { type: NoteType.Daily });
        }
      }
    );

    reaction(
      () => this.isSyncNotes,
      (isSyncNotes) => {
        if (!this.storage.selectedNoteId && isSyncNotes) {
          this.storage.setSelectedNoteId(this.todayDailyNote);
        }
      }
    );

    reaction(
      () => this.selectedNote,
      (selectedNode) => {
        if (!selectedNode) {
          this.storage.setSelectedNoteId(this.todayDailyNote);
        }
      }
    );
  }

  public get todayDailyNote(): string | null {
    return (
      this.dailyPages.find(({ dateCreated }) => isToday(dateCreated))?.id ||
      null
    );
  }

  public get selectedNote(): Note | null {
    const selectedNote = this.pagesMap?.[this.storage.selectedNoteId || ''];
    if (!selectedNote) {
      return null;
    }

    return selectedNote;
  }

  public get pages(): Note[] {
    return Object.values(this.pagesMap || {}).filter(
      ({ type }) => type !== NoteType.Daily
    );
  }

  public get pinedPages(): Note[] {
    return this.pages.filter(({ pined }) => pined);
  }

  public get dailyPages(): Note[] {
    return Object.values(this.pagesMap || {})
      .filter(({ type }) => type === NoteType.Daily)
      .sort((a, b) => b.dateCreated - a.dateCreated);
  }

  public get unPinedPages(): Note[] {
    return this.pages.filter(({ pined }) => !pined);
  }

  public get orderedPages(): Note[] {
    if (!this.pages.length) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstItem = this.pages.find(({ prevId }) => !prevId)!;
    const result: Note[] = [firstItem];
    const pagePrevIds = this.pages.map(({ prevId }) => prevId);
    for (let i = 0; i < this.pages.length; i++) {
      const index = pagePrevIds.indexOf(result[i].id);
      if (index === -1) {
        // eslint-disable-next-line no-continue
        continue;
      }

      result.push(this.pages[index]);
    }

    return result;
  }

  public getById(noteId: string): Note | null {
    return this.pagesMap?.[noteId] || null;
  }

  public async addNote(
    title: string,
    additional: Partial<Omit<Note, 'id' | 'title'>> = {}
  ) {
    try {
      const noteId = nanoid(16);

      await set(child(this.ref, noteId), {
        id: noteId,
        title,
        type: NoteType.Base,
        content: null,
        ...additional,
        lastUpdated: null,
        dateCreated: new Date().getTime(),
        prevId: this.pages[this.pages.length - 1]?.id || null,
        viewers: {},
      } as Note);

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return false;
  }

  public async changeOrder(
    oldIndex?: number,
    newIndex?: number
  ): Promise<void> {
    if (oldIndex === undefined || newIndex === undefined) {
      return;
    }

    const newOrdered = [...this.orderedPages];
    newOrdered.splice(newIndex, 0, newOrdered.splice(oldIndex, 1)[0]);
    const updateMap: Record<string, string | null> = {};

    if (newOrdered[0].prevId) {
      updateMap[`${newOrdered[0].id}/prevId`] = null;
    }

    for (let i = 1; i < newOrdered.length; i++) {
      if (newOrdered[i].prevId !== newOrdered[i - 1].id) {
        updateMap[`${newOrdered[i].id}/prevId`] = newOrdered[i - 1].id;
      }
    }

    await update(this.ref, updateMap);
  }

  public async changePinedById(id: string, pinedState: boolean): Promise<void> {
    await update(child(this.ref, id), { pined: pinedState });
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.modals.openModal(ModalNames.DeleteConfirmation, {
        backdrop: 'static',
        role: 'alertdialog',
        size: 'xs',
        render: DeleteConfirmation,
      });

      await remove(child(this.ref, id));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Delete item canceled');
    }
  }

  public async changeTitle(id: string, title: string): Promise<void> {
    try {
      await update(child(this.ref, id), { title });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public changeViewed = async (
    noteRef: DatabaseReference,
    profileId: string,
    state: number | null
  ): Promise<void> => {
    try {
      const noteSnapshot = await get(noteRef);
      const note: Note = await noteSnapshot.val();
      const updatedViewerData = {
        ...(note.viewers?.[profileId] || {}),
        active: state !== null,
        lastView: state || note.viewers?.[profileId]?.lastView || null,
      } as Viewer;

      await update(noteRef, {
        [`viewers/${profileId}`]: updatedViewerData,
      });

      if (state) {
        this.storage.addProfileForCache(profileId);
      } else {
        this.storage.removeProfileForCache(profileId);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  public share = async (
    noteId: string,
    id: string,
    workEnvironment: string,
    rules: SharedRules
  ): Promise<void> => {
    try {
      const toNoteRef = child(this.ref, noteId);
      const startShared = Date.now();

      await update(toNoteRef, {
        [`viewers/${id}`]: {
          active: false,
          lastView: null,
          rules,
          startShared,
          workEnvironment,
        } as Viewer,
      });

      await set(
        ref(
          db,
          `sharedNotes/${id}/${workEnvironment}/${this.profile.profileId}/${noteId}`
        ),
        {
          ref: toNoteRef.toString(),
          startShared,
          rules,
          blocked: false,
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  public async changeContent(id: string, content: string) {
    try {
      await update(child(this.ref, id), { content, lastUpdated: Date.now() });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  public startDataObservable() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = onValue(this.ref, (snapshot) => {
      this.pagesMap = snapshot.val();
      this.isSyncNotes = true;
    });
  }
}

export default NotesStore;
