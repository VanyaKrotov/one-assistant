import styled, { createGlobalStyle, css } from 'styled-components';

import { DEFAULT_SIZES } from 'definitions/window';
import { FOCUSED_BUTTON } from 'renderer/styles/templates';

const {
  titleBarHeight,
  frameButtonIconSize,
  frameIconWidth,
  frameIconSize,
  frameButtonWidth,
  minWidth,
} = DEFAULT_SIZES;

export const WindowGlobalStyle = createGlobalStyle`
    .screen-height {
        height: calc(100vh - ${DEFAULT_SIZES.titleBarHeight}px);
    }

    .rs-modal-wrapper, .rs-modal-backdrop, .rs-drawer-wrapper, .rs-drawer-backdrop, .rs-drawer-top {
        top: ${DEFAULT_SIZES.titleBarHeight}px;
    }

    .rs-drawer-full.rs-drawer-bottom, .rs-drawer-full.rs-drawer-top {
        height: calc(100% - (60px + ${DEFAULT_SIZES.titleBarHeight}px));
    }
`;

const BUTTON_CONTROL_WIDTH = frameButtonWidth * 4;

export const TitleContainer = styled.section`
  width: 100%;
  height: ${titleBarHeight}px;
  display: flex;
  align-items: center;
  background-color: var(--oa-frame-bg);
  color: var(--rs-gray-200);

  & > * {
    height: 100%;
  }
`;

export const ButtonControl = styled.section`
  width: ${BUTTON_CONTROL_WIDTH}px;
`;

export const IconControl = styled.section`
  width: ${frameIconWidth}px;
  text-align: center;
  -webkit-app-region: drag;
  padding: ${(titleBarHeight - frameIconSize) / 2}px
    ${(frameIconWidth - frameIconSize) / 2}px;

  & > svg {
    width: ${frameIconSize}px;
    height: auto;
  }
`;

export const TitleControl = styled.section`
  height: ${titleBarHeight}px;
  padding: 0px 10px;
  font-size: 12px;
  line-height: ${titleBarHeight}px;
  text-align: center;
  flex: auto;
  -webkit-app-region: drag;
`;

const BlankButton = styled.button<{ focused?: boolean }>`
  ${({ focused = true }) => focused && FOCUSED_BUTTON}
  user-select: none;
  background-color: transparent;
`;

export const Button = styled(BlankButton)`
  width: ${frameButtonWidth}px;
  height: ${titleBarHeight}px;
  box-sizing: border-box;
  padding: ${(titleBarHeight - frameButtonIconSize) / 2}px 10px;

  & > svg {
    width: ${frameButtonIconSize}px;
    height: auto;
  }

  &:hover {
    background-color: var(--rs-gray-700);
  }

  &:hover:last-child {
    background-color: var(--rs-red-700);
  }
`;

const TabActionsCss = css`
  &:enabled:hover,
  &:enabled:active,
  &:enabled[aria-selected='true'] {
    background-color: var(--rs-body);
  }

  &:disabled {
    color: var(--rs-gray-500);
  }
`;

export const SettingsButton = styled(Button)`
  ${TabActionsCss}
`;

export const FrameContainer = styled.div`
  height: 100%;
`;

export const ContentContainer = styled.section`
  height: calc(100vh - ${titleBarHeight}px);
`;

export const TabsContainer = styled.div`
  max-width: ${minWidth - frameIconWidth - BUTTON_CONTROL_WIDTH - 100}px;
  display: flex;
`;

export const Tab = styled(BlankButton)`
  padding: 0px 10px;

  ${TabActionsCss}
`;

export const ProfileTab = styled(Tab)`
  height: calc(100% - 6px);
  margin: 3px;
  padding: 1px 8px 1px 3px;

  background-color: var(--rs-gray-700);
  border: 1px solid transparent;
  border-radius: 20px;

  &:disabled {
    border: 1px solid var(--rs-red-800);
  }
`;
