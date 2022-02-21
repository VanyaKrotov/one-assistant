import { InputPicker, List } from 'rsuite';

import { FOCUSED_BUTTON } from 'renderer/styles/templates';
import styled, { css } from 'styled-components';

interface ListItemContentProps {
  selected?: boolean;
}

const ListItemContent = styled.button<ListItemContentProps>`
  ${FOCUSED_BUTTON}
  width: 100%;
  text-align: left;
  padding: 6px;
  background-color: ${({ selected }) =>
    selected ? 'var(--rs-gray-600)' : 'transparent'};
  box-shadow: none;

  &:not(:last-child) {
    padding-right: 20px;
  }

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        background-color: var(--rs-gray-700);
      }
    `}
`;

export const PageListItem = styled(List.Item).attrs({
  as: ListItemContent,
})<ListItemContentProps>`
  height: 38px;
`;

export const DailyPicker = styled(InputPicker).attrs({
  appearance: 'subtle',
  block: true,
  cleanable: false,
})`
  border: none;

  &.rs-picker-focused,
  & > div {
    box-shadow: none;
    border: none;
  }
`;
