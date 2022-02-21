import { ContextMenuItemHandler } from '../types';

export const handlerBuilder =
  (handler: ContextMenuItemHandler) =>
  (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    data: Record<string, string>,
    target: HTMLElement
  ) =>
    handler(
      (target.childNodes[0] as HTMLElement)?.dataset?.uid as string,
      event,
      data,
      target
    );
