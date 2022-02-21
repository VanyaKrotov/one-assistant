import styled from 'styled-components';
import { ColorPickerSize } from './constants';

export const ColorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 4px;
  height: ${ColorPickerSize.lg}px;
  margin-top: 6px;
`;

export const ColorItem = styled.button.attrs({ type: 'button' })<{
  selected: boolean;
  size?: 'sm' | 'md' | 'lg';
}>`
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  background-color: ${({ color }) => color};
  width: ${({ size = 'md' }) => ColorPickerSize[size]}px;
  height: ${({ size = 'md' }) => ColorPickerSize[size]}px;

  &::after {
    ${({ selected }) => (selected ? "content: '';" : '')}
    border-radius: 50%;
    position: absolute;
    width: ${({ size = 'md' }) => ColorPickerSize[size] / 2}px;
    height: ${({ size = 'md' }) => ColorPickerSize[size] / 2}px;
    left: ${({ size = 'md' }) => ColorPickerSize[size] / 4}px;
    top: ${({ size = 'md' }) => ColorPickerSize[size] / 4}px;
    background-color: var(--rs-gray-700);
  }
`;
