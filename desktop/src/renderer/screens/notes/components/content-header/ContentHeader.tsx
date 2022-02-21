import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown, FlexboxGrid, IconButton } from 'rsuite';

import { NoteType } from 'types/Note';
import { getDailyTitle } from 'helpers/text';
import { notesHooks } from 'renderer/hooks';

import MoreIcon from 'renderer/icons/more.svg';

import EditableTitle from 'renderer/components/editable-title';
import { notes } from 'renderer/store';

import { Container } from './duck/styles';

import { notesModals } from '../../duck';

import { SharedTo } from './components';

const ContentHeader: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentNote = notes.selectedNote!;
  const isDailyNote = currentNote.type === NoteType.Daily;
  const viewers = notesHooks.useJoinedViewers(currentNote);

  return (
    <Container>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={12}>
          <EditableTitle
            readOnly={isDailyNote}
            size="lg"
            onSave={(value) => notes.changeTitle(currentNote.id, value)}
          >
            {isDailyNote
              ? `Ежедневная от ${getDailyTitle(
                  currentNote.dateCreated
                ).toLocaleLowerCase()}`
              : currentNote.title}
          </EditableTitle>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <FlexboxGrid align="middle" justify="end" className="margin-right-10">
            <FlexboxGrid.Item className="margin-right-10">
              <SharedTo viewers={viewers} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Dropdown
                placement="bottomEnd"
                renderToggle={(props, ref) => (
                  <IconButton
                    appearance="subtle"
                    circle
                    icon={<MoreIcon />}
                    {...props}
                    ref={ref}
                  />
                )}
              >
                {/* <Dropdown.Item>Поделится</Dropdown.Item> */}
                <Dropdown.Item onClick={() => notes.delete(currentNote.id)}>
                  Удалить
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => notesModals.openNoteInfoModal(currentNote.id)}
                >
                  Сведенья
                </Dropdown.Item>
              </Dropdown>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default observer(ContentHeader);
