/* eslint-disable react/prop-types */
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal as RSuiteModal } from 'rsuite';

import { modals } from 'renderer/store';

const Modals: FC = () => {
  const { modalList } = modals;

  return (
    <>
      {modalList.map((props) => {
        if (!props) {
          return null;
        }

        const {
          resolve,
          reject,
          openTime,
          render,
          closeModal,
          ...restModalProps
        } = props;

        return (
          <RSuiteModal
            key={restModalProps.name}
            {...restModalProps}
            onClose={(event) => {
              closeModal();
              reject('modal-closed');
              restModalProps?.onClose?.(event);
            }}
          >
            {render({
              ...props,
              closeModal,
              resolve,
              reject,
              openTime,
              render,
            })}
          </RSuiteModal>
        );
      })}
    </>
  );
};

export default observer(Modals);
