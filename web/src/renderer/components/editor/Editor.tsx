import { FC, useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import SunEditorCore from 'suneditor/src/lib/core';
import { ru } from 'suneditor/src/lang';
import styled from 'styled-components';

import { useResizeWindow } from 'renderer/hooks';

import { OPTIONS } from './duck/constants';

import 'suneditor/dist/css/suneditor.min.css';
import './duck/styles.css';

interface EditorProps extends SunEditorReactProps {
  value?: string | null;
  onSave: (content: string, event?: FocusEvent) => void;
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const Editor: FC<EditorProps> = ({ value, onSave, ...props }) => {
  const ref = useRef<SunEditorCore>();
  const containerRef = useRef<HTMLDivElement>();
  const [height, setHeight] = useState('auto');
  const { sizes } = useResizeWindow();

  useEffect(() => {
    ref.current?.setContents(value || '');
  }, [value]);

  useEffect(() => {
    const containerHeight = containerRef.current?.clientHeight;
    const toolbarElement = containerRef.current?.querySelector?.(
      '.se-toolbar'
    ) as HTMLDivElement;

    if (!containerHeight || !toolbarElement) {
      return;
    }

    setHeight(`${containerHeight - toolbarElement.clientHeight}px`);
  }, [sizes]);

  return (
    <Container ref={containerRef}>
      <SunEditor
        {...props}
        lang={ru}
        height={height}
        setOptions={OPTIONS}
        defaultValue={value || ''}
        getSunEditorInstance={(editor) => {
          ref.current = editor;
        }}
        onBlur={(event, content) => onSave(content, event)}
      />
    </Container>
  );
};

Editor.defaultProps = {
  value: '',
};

export default Editor;
