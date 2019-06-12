import { Auth, AuthService } from '@services/auth.service';
import { Environment, EnvironmentService } from '@services/environment.service';
import { Modals, ModalsService } from '@services/modals.service';
import { Store, StoreService } from '@services/store.service';
import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain,
  systemPreferences,
} from 'electron';
import {
  Assistant,
  AssistantQueryOptions,
  AudioOutEncoding,
  AudioConversation,
  AssistantResponse,
  TextConversation,
} from 'nodejs-assistant';
import { container } from './di.helper';

export class BrowserWindowWithEvents extends BrowserWindow {
  private _authService: Auth = container.get(AuthService);
  private _environmentService: Environment = container.get(EnvironmentService);
  private _modalsService: Modals = container.get(ModalsService);
  private _storeService: Store = container.get(StoreService);
  private _assistant: Assistant;
  private _textConversation: TextConversation;
  private _audioConversation: AudioConversation;

  public constructor(options?: BrowserWindowConstructorOptions) {
    super(options);

    if (this._environmentService.mac) {
      systemPreferences.subscribeNotification(
        'AppleInterfaceThemeChangedNotification',
        () =>
          this.webContents.send(
            'app.setTheme',
            systemPreferences.isDarkMode() ? 'dark' : 'light',
          ),
      );
    }

    ipcMain
      .on(
        'auth.requestAuthentication',
        async (
          _: Event,
          {
            clientId,
            clientSecret,
          }: {
            clientId: string;
            clientSecret: string;
          },
        ) => {
          try {
            const credentials = await this._authService.getCredentials(
              clientId,
              clientSecret,
            );
            this._assistant = new Assistant(credentials);
            this.webContents.send('auth.resolveAuthentication');
          } catch (e) {
            this.webContents.send('auth.rejectAuthentication', e);
          }
        },
      )
      .on('auth.requestLogout', () => {
        try {
          this._storeService.clearAuthData();
          this.webContents.send('auth.resolveLogout');
        } catch (e) {
          this.webContents.send('auth.rejectLogout', e);
        }
      })
      .on(
        'chat.requestSendMessage',
        async (
          _: Event,
          {
            text,
            options,
          }: {
            text: string;
            options: AssistantQueryOptions;
          },
        ) => {
          if (this._assistant) {
            if (!this._textConversation) {
              this._textConversation = this._assistant.startTextConversation({
                encoding: AudioOutEncoding.MP3,
                sampleRateHertz: 16000,
                volumePercentage: 100,
              });
              this._textConversation
                .on('data', response => {
                  this.webContents.send('chat.receiveMessage', response);
                })
                .on('end', () => {
                  this._textConversation = null;
                });
            }
            this.webContents.send(
              this._textConversation.send(text)
                ? 'chat.resolveSendMessage'
                : 'chat.rejectSendMessage',
              text,
            );
            return;
          }
          this.webContents.send(
            'chat.rejectSendMessage',
            new Error('Unable to send message'),
          );
        },
      )
      .on(
        'chat.requestSendAudio',
        async (
          _: Event,
          {
            audio,
          }: {
            audio: Buffer;
          },
        ) => {
          if (this._assistant) {
            if (!this._audioConversation) {
              this._audioConversation = this._assistant.startAudioConversation();
              this._audioConversation
                .on('data', (response: AssistantResponse) => {
                  this.webContents.send('chat.receiveMessage', response);
                })
                .on('end', () => {
                  this._audioConversation = null;
                });
            }
            this.webContents.send(
              this._audioConversation.send(audio)
                ? 'chat.resolveSendAudio'
                : 'chat.rejectSendAudio',
            );
            return;
          }
          this.webContents.send(
            'chat.rejectSendAudio',
            new Error('Unable to send audio'),
          );
        },
      )
      .on('app.requestModalOpening', (_: Event, ref: string) => {
        try {
          const modal = this._modalsService.open(ref);
          modal.once('closed', () =>
            this.webContents.send('app.resolveModalOpening'),
          );
        } catch (e) {
          this.webContents.send('app.rejectModalOpening', e);
        }
      });

    this.once('closed', () => {
      ipcMain.removeAllListeners('auth.requestAuthentication');
      ipcMain.removeAllListeners('auth.requestLogout');
      ipcMain.removeAllListeners('chat.requestSendMessage');
      ipcMain.removeAllListeners('chat.requestSendAudio');
      ipcMain.removeAllListeners('chat.requestModalOpening');
    });
  }
}
