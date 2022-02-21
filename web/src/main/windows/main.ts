import path from 'path';
import { URL } from 'url';
import { BrowserWindow, ipcMain, shell } from 'electron';
import windowStateKeeper from 'electron-window-state';

import { DEFAULT_SIZES, WindowEventMessage } from '../../definitions/window';

class MainWindow {
  private window: BrowserWindow | null = null;

  private readonly EXTENSIONS = ['REACT_DEVELOPER_TOOLS'];

  constructor(
    private readonly isDevelopment: boolean,
    private readonly RESOURCES_PATH: string
  ) {
    if (this.isDevelopment) {
      this.installExtensions();
    }

    const mainWindowState = windowStateKeeper({
      defaultWidth: DEFAULT_SIZES.minWidth,
      defaultHeight: DEFAULT_SIZES.minHeight,
    });

    this.window = new BrowserWindow({
      ...DEFAULT_SIZES,
      ...mainWindowState,
      show: false,
      frame: false,
      icon: this.getAssetPath('logo192.png'),
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
    });

    mainWindowState.manage(this.window);

    this.window.loadURL(this.resolveHtmlPath('index.html'));

    this.runListeners();
  }

  private getAssetPath(...paths: string[]): string {
    return path.join(this.RESOURCES_PATH, ...paths);
  }

  private resolveHtmlPath = (htmlFileName: string): string => {
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}`);

      url.pathname = htmlFileName;

      return url.href;
    }

    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };

  //
  private installExtensions = () => {
    // eslint-disable-next-line global-require
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    return (
      installer
        .default(
          this.EXTENSIONS.map((name) => installer[name]),
          forceDownload
        )
        // eslint-disable-next-line no-console
        .catch(console.log)
    );
  };

  // Method for run all window listeners
  private runListeners(): void {
    if (!this.window) {
      return;
    }

    this.window.on('ready-to-show', () => {
      if (!this.window) {
        throw new Error('"window" is not defined');
      }

      if (process.env.START_MINIMIZED) {
        this.window.minimize();
      } else {
        this.window.show();
      }
    });

    this.window.on('maximize', () => {
      this.window?.webContents.send(WindowEventMessage.Maximized);
    });

    this.window.on('unmaximize', () => {
      this.window?.webContents.send(WindowEventMessage.Restored);
    });

    this.window.on('closed', () => {
      this.window = null;
    });

    this.window.webContents.on('new-window', (event, url) => {
      event.preventDefault();

      shell.openExternal(url);
    });

    // listen message from content

    ipcMain.on(WindowEventMessage.Close, () => {
      if (this.window?.closable) {
        this.window?.close();
      }
    });

    ipcMain.on(WindowEventMessage.Minimize, () => this.window?.minimize());

    ipcMain.on(WindowEventMessage.Maximize, () => {
      this.window?.[this.window?.isMaximized() ? 'restore' : 'maximize']();
    });
  }
}

export default MainWindow;
