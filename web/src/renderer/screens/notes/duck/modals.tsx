import { ModalNames } from 'types/Modal';

import { modals } from 'renderer/store';

import { InfoModal } from '../components';

export const openNoteInfoModal = async (noteId?: string) => {
  if (!noteId) {
    return;
  }

  try {
    await modals.openModal(ModalNames.NoteInfoModal, {
      data: {
        noteId,
      },
      render: (modalProps) => <InfoModal {...modalProps} />,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
