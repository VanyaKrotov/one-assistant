import styled from 'styled-components';

export const Sections = styled.div`
  height: 100%;
`;

export const Container = styled.section`
  &:not(:last-child) {
    border-bottom: 1px solid var(--rs-border-secondary);
  }

  & .hidable {
    display: none;
  }

  &:hover .hidable {
    display: block;
  }
`;

export const Title = styled.p`
  font-size: 12px;
  line-height: 30px;
  color: var(--rs-text-tertiary);
  padding: 0px 6px;
  text-transform: uppercase;
`;

export const Content = styled.div`
  padding-top: 4px;
  padding-bottom: 6px;
`;
