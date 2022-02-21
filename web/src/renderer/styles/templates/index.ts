import { css } from 'styled-components';

export const FOCUSED_BUTTON = css`
  border: 1px solid transparent;

  &:enabled:focus {
    border: 1px dotted var(--rs-primary-500);
  }
`;
