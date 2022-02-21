/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AvatarProps } from 'rsuite';
import styled, { css } from 'styled-components';

import { PROFILE_NAME_FONT_SIZE_MAP } from './constants';

const ProfileText = styled.p<{ isError?: boolean; size: AvatarProps['size'] }>`
  ${({ isError = false }) =>
    isError &&
    css`
      color: var(--rs-red-600) !important;
    `}
  margin: 0;
  line-height: ${({ size }) => PROFILE_NAME_FONT_SIZE_MAP[size!].lineHeight}px;
`;

export const ProfileName = styled(ProfileText)`
  font-size: ${({ size }) => PROFILE_NAME_FONT_SIZE_MAP[size!].font}px;
`;

export const Email = styled(ProfileText)`
  color: var(--rs-text-tertiary);
  font-size: ${({ size }) => PROFILE_NAME_FONT_SIZE_MAP[size!].font - 2}px;
`;
