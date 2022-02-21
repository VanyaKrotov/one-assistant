import { ReactNode } from 'react';
import { ModalProps } from 'rsuite';

export enum ModalNames {
  DeleteConfirmation,
  NoteInfoModal,
}

export interface Modal<DataType = Record<string, unknown>> extends ModalProps {
  name: ModalNames;
  openTime: number;
  data?: DataType;
  closeModal: (resetValue?: boolean) => void;
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
  render: (modal: this) => ReactNode;
}
