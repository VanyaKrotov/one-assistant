import styled from 'styled-components';

export const NoteTitle = styled.span`
  font-weight: 600;
`;

export const Section = styled.section`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const SectionTitle = styled.div`
  color: var(--rs-text-secondary);
  width: 200px;
`;

export const SectionContent = styled.div``;
