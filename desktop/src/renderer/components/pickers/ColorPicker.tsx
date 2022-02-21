import { FC } from 'react';
import { FormControlProps } from 'rsuite';

import ValueLabel from 'types/ValueLabel';
import { ColorsContainer, ColorItem } from './styles';

interface ColorPickerProps extends FormControlProps {
  data: ValueLabel<string>[];
  size?: 'sm' | 'md' | 'lg';
}

const ColorPicker: FC<ColorPickerProps> = ({
  data,
  onChange,
  size,
  ...props
}) => (
  <ColorsContainer>
    {data.map(({ value, label }) => (
      <ColorItem
        color={value}
        key={label}
        size={size}
        selected={value === props.value}
        onClick={(event) => onChange && onChange(value, event)}
      />
    ))}
  </ColorsContainer>
);

ColorPicker.defaultProps = {
  size: 'sm',
};

export default ColorPicker;
