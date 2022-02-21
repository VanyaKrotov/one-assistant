import styled from 'styled-components';

export const NotesContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const SidebarContainer = styled.div.attrs({
  className: 'full-height',
})``;

export const ContentContainer = styled.div.attrs({
  className: 'full-height',
})`
  background-color: var(--oa-content-bg);
`;

export const EditorContainer = styled.div`
  height: calc(100vh - 75px);
`;
