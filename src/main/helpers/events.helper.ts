import { Auth, AuthService } from '@services/auth.service';
import { Store, StoreService } from '@services/store.service';
import { BrowserWindow, BrowserWindowConstructorOptions, Event, ipcMain, systemPreferences } from 'electron';
import { Assistant } from 'nodejs-assistant';
import { container } from './di.helper';

export class BrowserWindowWithEvents extends BrowserWindow {
  private _authService: Auth = container.get(AuthService);
  private _storeService: Store = container.get(StoreService);
  private _assistant: Assistant;

  constructor(options?: BrowserWindowConstructorOptions) {
    super(options);

    if (process.platform === 'darwin') {
      systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () =>
        this.webContents.send('app.setTheme', systemPreferences.isDarkMode() ? 'dark' : 'light'));
    }

    ipcMain
      .on('auth.requestAuthentication', async (_: Event, {
        clientId,
        clientSecret,
      }: any) => {
        try {
          const credentials = await this._authService.getCredentials(clientId, clientSecret);
          this._assistant = new Assistant(credentials);
          this.webContents.send('auth.resolveAuthentication');
        } catch (e) {
          this.webContents.send('auth.rejectAuthentication', e);
        }
      })
      .on('auth.requestLogout', () => {
        try {
          this._storeService.clearAuthData();
          this.webContents.send('auth.resolveLogout');
        } catch (e) {
          this.webContents.send('auth.rejectLogout', e);
        }
      })
      .on('chat.requestSendMessage', async (_: Event, text: string) => {
        if (this._assistant) {
          this.webContents.send('chat.resolveSendMessage');
          const response = await this._assistant.query(text);
          if (response) {
            this.webContents.send('chat.receiveMessage', response);
          }
          return;
        }
        this.webContents.send('chat.rejectSendMessage', new Error('Unable to send message'));
      });
  }
}
