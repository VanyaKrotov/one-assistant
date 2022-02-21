import styled from 'styled-components';
import { Input as NativeInput } from 'rsuite';

export const Input = styled(NativeInput)`
  border-color: transparent;
  background-color: transparent;

  &:read-only:hover {
    cursor: default;
  }

  &:enabled:focus,
  &:enabled:hover,
  &:read-only:focus {
    box-shadow: none;
    border-color: transparent;
  }
`;
