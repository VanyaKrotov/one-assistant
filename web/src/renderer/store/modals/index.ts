import { makeAutoObservable } from 'mobx';

import { Modal, ModalNames } from 'types/Modal';

class ModalsStore {
  private modalsMap: Record<ModalNames, Modal | null> = {
    [ModalNames.DeleteConfirmation]: null,
    [ModalNames.NoteInfoModal]: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  public get modalList(): (Modal | null)[] {
    return Object.values(this.modalsMap);
  }

  public closeModal(name: ModalNames, resetValues = false): void {
    if (resetValues) {
      this.modalsMap[name] = null;
      return;
    }

    this.modalsMap[name] = {
      ...((this.modalsMap[name] || {}) as Modal),
      open: false,
    };
  }

  public async openModal(
    name: ModalNames,
    props: Pick<Modal, 'render'> & Partial<Omit<Modal, 'render'>>
  ): Promise<unknown> {
    const closeModal = (resetValues?: boolean) =>
      this.closeModal(name, resetValues);

    return new Promise((resolve, reject) => {
      this.modalsMap[name] = {
        ...props,
        name,
        open: true,
        closeModal,
        resolve: (value) => {
          resolve(value);
          closeModal();
        },
        reject: (value) => {
          reject(value);
          closeModal();
        },
        openTime: Date.now(),
      };
    });
  }
}

export default ModalsStore;
