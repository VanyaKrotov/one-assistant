import styled from 'styled-components';
import { Avatar as NativeAvatar } from 'rsuite';

export const Container = styled.button`
  border-radius: 20px;
  background-color: var(--rs-gray-700);
  padding: 5px 6px;

  & > *:not(:last-child) {
  }
`;

export const ShareIconsContainer = styled.span`
  margin-right: 6px;
`;

export const Avatar = styled(NativeAvatar).attrs({
  circle: true,
  size: 'xs',
})`
  &[data-active='true'] {
    box-shadow: var(--rs-state-focus-shadow);
  }

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
