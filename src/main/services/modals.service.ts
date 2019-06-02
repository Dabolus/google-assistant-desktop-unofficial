import { injectable } from '@helpers/di.helper';
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export interface Modals {
  open(ref: string, options?: BrowserWindowConstructorOptions): BrowserWindow;
  openUrl(
    url: string,
    options?: BrowserWindowConstructorOptions,
  ): BrowserWindow;
}

@injectable()
export class ModalsService implements Modals {
  private _modalsSettings: BrowserWindowConstructorOptions = {
    alwaysOnTop: true,
    center: true,
    maximizable: false,
    minimizable: false,
    movable: false,
    resizable: false,
  };

  public open(
    ref: string,
    options?: BrowserWindowConstructorOptions,
  ): BrowserWindow {
    if (ref.startsWith('http')) {
      return this.openUrl(ref, options);
    }
  }

  public openUrl(
    url: string,
    options?: BrowserWindowConstructorOptions,
  ): BrowserWindow {
    const modal = new BrowserWindow({
      ...this._modalsSettings,
      ...options,
    });
    modal.loadURL(url);
    return modal;
  }
}
