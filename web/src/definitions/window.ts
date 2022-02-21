export const DEFAULT_SIZES = {
  minWidth: 800,
  minHeight: 600,
  titleBarHeight: 32,
  frameButtonWidth: 40,
  frameIconWidth: 40,
  frameIconSize: 20,
  frameButtonIconSize: 16,
};

export enum WindowEventMessage {
  Restored = 'window.restored',
  Maximized = 'window.maximized',
  Minimize = 'window.minimize',
  Maximize = 'window.maximize',
  Close = 'window.close',
}
