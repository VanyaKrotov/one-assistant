import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Modal } from 'rsuite';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Modal as ModalProps } from 'types/Modal';
import { getNoteTypeLabel } from 'helpers/text';

import { notes } from 'renderer/store';
import { notesHooks } from 'renderer/hooks';

import { NoteTitle, Section, SectionContent, SectionTitle } from './styles';

const InfoModal: FC<ModalProps> = ({ reject, data }) => {
  const note = notes.getById(data?.noteId as string);
  const viewers = notesHooks.useJoinedViewers(note);

  if (!note) {
    reject('Invalid note data!');

    return null;
  }

  console.log('note: ', note);

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          Сведения об заметке - <NoteTitle>{note.title}</NoteTitle>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Section>
          <SectionTitle>Идентификатор:</SectionTitle>
          <SectionContent>{note.id}</SectionContent>
        </Section>

        <Section>
          <SectionTitle>Тип:</SectionTitle>
          <SectionContent>{getNoteTypeLabel(note.type)}</SectionContent>
        </Section>

        <Section>
          <SectionTitle>Закреплена:</SectionTitle>
          <SectionContent>{note.pined ? 'Да' : 'Нет'}</SectionContent>
        </Section>

        <Section>
          <SectionTitle>Общий доступ:</SectionTitle>
          <SectionContent>
            {viewers
              .map(
                ({ profile, viewInfo }) =>
                  `${profile.name}${viewInfo.active ? '*' : ''}`
              )
              .join(', ')}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Дата создания:</SectionTitle>
          <SectionContent>
            {format(note.dateCreated, `dd MMM yyyy 'в' HH:mm:ss (XXX)`, {
              locale: ru,
            })}
          </SectionContent>
        </Section>

        {note.lastUpdated && (
          <Section>
            <SectionTitle>Последнее изменение:</SectionTitle>
            <SectionContent>
              {format(note.lastUpdated, `dd MMM yyyy 'в' HH:mm:ss (XXX)`, {
                locale: ru,
              })}
            </SectionContent>
          </Section>
        )}

        <Modal.Footer className="text-align-left font-small">
          <code>*</code> - <i>активное состояние пользователя</i>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default observer(InfoModal);
