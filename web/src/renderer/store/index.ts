import { reaction } from 'mobx';
import { child, ref } from 'firebase/database';

import { db } from 'renderer/firebase';

import ViewStore from './view';
import NotesStore from './notes';
import ProfileStore from './profile';
import LocalDataStore from './local-data';
import CacheStore from './cache';
import ModalsStore from './modals';

// additional storages
const storage = new LocalDataStore();
const cache = new CacheStore(storage);
const view = new ViewStore();
const modals = new ModalsStore();

// profile stores
const profile = new ProfileStore(storage);
const notes = new NotesStore(profile, storage, modals);

reaction(
  () => profile.profile,
  (changedProfile) => {
    if (!changedProfile) {
      return;
    }

    notes.ref = child(ref(db, 'notes'), changedProfile.activeWorkEnvironment);

    notes.startDataObservable();
  }
);

reaction(
  () => storage.selectedNoteId,
  (selectedNoteId, prevSelectedNoteId) => {
    if (prevSelectedNoteId) {
      notes.changeViewed(
        child(notes.ref, prevSelectedNoteId),
        profile.profileId,
        null
      );
    }

    if (selectedNoteId) {
      notes.changeViewed(
        child(notes.ref, selectedNoteId),
        profile.profileId,
        Date.now()
      );
    }
  }
);

reaction(
  () => notes.selectedNote,
  (selectedNode, prevSelectedNode) => {
    if (selectedNode?.viewers) {
      storage.addProfilesForCache(Object.keys(selectedNode.viewers));
    }

    if (prevSelectedNode?.viewers) {
      storage.removeProfilesForCache(Object.keys(prevSelectedNode.viewers));
    }
  }
);

export { view, notes, profile, storage, modals, cache };
