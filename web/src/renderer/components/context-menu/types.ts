import React from 'react';

export type ContextMenuItemHandler = (
  key: string,
  event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  data: Record<string, string>,
  target: HTMLElement
) => void;

export interface ContextMenuItem {
  icon?: JSX.Element;
  label: string;
  handler: ContextMenuItemHandler;
  className?: string;
}
