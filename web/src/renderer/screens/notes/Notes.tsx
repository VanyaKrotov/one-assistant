import { observer } from 'mobx-react-lite';
import SplitterLayout from 'react-splitter-layout';
import Editor from 'renderer/components/editor';

import Title from 'renderer/components/title';

import { notes } from 'renderer/store';

import { ContentHeader, SideBar } from './components';
import { ContentContainer, SidebarContainer, EditorContainer } from './styles';

const onSaveContent = (value: string) => {
  if (!notes.selectedNote) {
    return;
  }

  notes.changeContent(notes.selectedNote.id, value);
};

const Notes = () => {
  return (
    <SplitterLayout
      primaryMinSize={550}
      primaryIndex={1}
      secondaryMinSize={250}
      secondaryInitialSize={300}
    >
      <SidebarContainer>
        <SideBar />
      </SidebarContainer>
      <ContentContainer>
        {notes.selectedNote && (
          <Title title={notes.selectedNote.title}>
            <ContentHeader />
            <EditorContainer>
              <Editor
                value={notes.selectedNote.content}
                onSave={onSaveContent}
              />
            </EditorContainer>
          </Title>
        )}
      </ContentContainer>
    </SplitterLayout>
  );
};

export default observer(Notes);
