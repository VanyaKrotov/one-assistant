import { makeAutoObservable } from 'mobx';

import { getSystemTheme } from 'helpers/styles';

import { WindowEventMessage } from 'definitions/window';

import { watchChangeTitle } from 'renderer/helpers/frame';

const { ipcRenderer } = window.require('electron');

class ViewStore {
  public theme = getSystemTheme();

  public title = document.title;

  public isMaximizeWindow: boolean = false;

  constructor() {
    makeAutoObservable(this);

    watchChangeTitle(this.updateTitle);

    ipcRenderer.on(WindowEventMessage.Maximized, () =>
      this.setIsMaximizeWindow(true)
    );
    ipcRenderer.on(WindowEventMessage.Restored, () =>
      this.setIsMaximizeWindow(false)
    );
  }

  private updateTitle = () => {
    this.title = document.title;
  };

  private setIsMaximizeWindow = (state: boolean) => {
    this.isMaximizeWindow = state;
  };
}

export default ViewStore;
