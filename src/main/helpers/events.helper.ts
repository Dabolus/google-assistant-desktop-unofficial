import { Auth, AuthService } from '@services/auth.service';
import { Environment, EnvironmentService } from '@services/environment.service';
import { Modals, ModalsService } from '@services/modals.service';
import { Store, StoreService } from '@services/store.service';
import { BrowserWindow, BrowserWindowConstructorOptions, Event, ipcMain, systemPreferences } from 'electron';
import { Assistant, AssistantQueryOptions, AudioOutEncoding } from 'nodejs-assistant';
import { container } from './di.helper';

export class BrowserWindowWithEvents extends BrowserWindow {
  private _authService: Auth = container.get(AuthService);
  private _environmentService: Environment = container.get(EnvironmentService);
  private _modalsService: Modals = container.get(ModalsService);
  private _storeService: Store = container.get(StoreService);
  private _assistant: Assistant;

  public constructor(options?: BrowserWindowConstructorOptions) {
    super(options);

    if (this._environmentService.mac) {
      systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () =>
        this.webContents.send('app.setTheme', systemPreferences.isDarkMode() ? 'dark' : 'light'));
    }

    ipcMain
      .on('auth.requestAuthentication', async (_: Event, {
        clientId,
        clientSecret,
      }: {
        clientId: string;
        clientSecret: string;
      }) => {
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
      .on('chat.requestSendMessage', async (_: Event, {
        text,
        options,
      }: {
        text: string;
        options: AssistantQueryOptions;
      }) => {
        if (this._assistant) {
          this.webContents.send('chat.resolveSendMessage', text);
          const response = await this._assistant.query(text, {
            audioOutConfig: {
              encoding: AudioOutEncoding.LINEAR16,
              sampleRateHertz: 16000,
              volumePercentage: 100,  
            },
            ...options,
          });
          if (response) {
            this.webContents.send('chat.receiveMessage', response);
          }
          return;
        }
        this.webContents.send('chat.rejectSendMessage', new Error('Unable to send message'));
      })
      .on('app.requestModalOpening', (_: Event, ref: string) => {
        try {
          const modal = this._modalsService.open(ref);
          modal.once('closed', () => this.webContents.send('app.resolveModalOpening'));
        } catch (e) {
          this.webContents.send('app.rejectModalOpening', e);
        }
      });

    this.once('closed', () => {
      ipcMain.removeAllListeners('auth.requestAuthentication');
      ipcMain.removeAllListeners('auth.requestLogout');
      ipcMain.removeAllListeners('chat.requestSendMessage');
    });
  }
}
