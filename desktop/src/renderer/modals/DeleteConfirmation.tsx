import { FC } from 'react';
import { Button, ButtonToolbar, Modal as RModal } from 'rsuite';

import { Modal } from 'types/Modal';

const DeleteConfirmation: FC<Modal> = ({ reject, resolve }) => {
  return (
    <>
      <RModal.Header>Удаление страницы</RModal.Header>
      <RModal.Body>Вы действительно хотите удалить страницу?</RModal.Body>
      <RModal.Footer>
        <ButtonToolbar>
          <Button appearance="subtle" onClick={reject}>
            Отмена
          </Button>
          <Button appearance="primary" color="red" onClick={resolve}>
            Удалить
          </Button>
        </ButtonToolbar>
      </RModal.Footer>
    </>
  );
};


export default DeleteConfirmation