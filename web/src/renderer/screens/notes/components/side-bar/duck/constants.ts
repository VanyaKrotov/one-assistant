import { notes } from 'renderer/store';
import { ContextMenuItem } from 'renderer/components/context-menu/types';

import { notesModals } from '../../../duck';

export enum SidebarStates {
  None,
  AddItem,
  EditItem,
}

export const DEFAULT_SIDEBAR_STATE = {
  state: SidebarStates.None,
  payload: null,
};

export const COMMON_MENU_OPTIONS: ContextMenuItem[] = [
  {
    handler: (ev) => console.log('rename', ev),
    label: 'Переименовать',
  },
  {
    handler: (id) => notes.delete(id),
    label: 'Удалить',
  },
  {
    handler: (id) => notesModals.openNoteInfoModal(id),
    label: 'Сведенья',
  },
];

export const PINED_MENU_OPTIONS = COMMON_MENU_OPTIONS.concat([]);

export const FREE_MENU_OPTIONS = COMMON_MENU_OPTIONS.concat([
  {
    handler: (id) => notes.changePinedById(id, true),
    label: 'Закрепить',
  },
]);
