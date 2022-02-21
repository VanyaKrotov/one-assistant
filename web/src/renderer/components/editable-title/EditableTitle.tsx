import { FC, FocusEvent, useState, useEffect } from 'react';
import { InputProps } from 'rsuite';

import { Input } from './duck/styles';

interface EditableTitleProps extends InputProps {
  children: string;
  onSave: (value: string, event: FocusEvent<HTMLInputElement, Element>) => void;
}

const EditableTitle: FC<EditableTitleProps> = ({
  children,
  onSave,
  ...restProps
}) => {
  const [value, setValue] = useState<string>(children);

  useEffect(() => {
    setValue(children);
  }, [children]);

  return (
    <Input
      value={value}
      onChange={setValue}
      onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
        onSave(value, event);
      }}
      {...restProps}
    />
  );
};

export default EditableTitle;
