import { Auth, AuthService } from '@services/auth.service';
import { Modals, ModalsService } from '@services/modals.service';
import { Store, StoreService } from '@services/store.service';
import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Event,
  ipcMain,
  nativeTheme,
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
import {
  supportedLocales,
  mapLocaleToAssistantLanguage,
  Locale,
} from './i18n.helper';

const _authService: Auth = container.get(AuthService);
const _modalsService: Modals = container.get(ModalsService);
const _storeService: Store = container.get(StoreService);
let _assistant: Assistant;
let _textConversation: TextConversation;
let _audioConversation: AudioConversation;
let _currentLocale: Locale = Locale.EN_US;

export const getBrowserWindowWithEvents = (
  options?: BrowserWindowConstructorOptions,
) => {
  const browserWindow = new BrowserWindow(options);

  nativeTheme.on('updated', () =>
    browserWindow.webContents.send(
      'app.setTheme',
      nativeTheme.shouldUseDarkColors ? 'dark' : 'light',
    ),
  );

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
          const credentials = await _authService.getCredentials(
            clientId,
            clientSecret,
          );
          _assistant = new Assistant(credentials, {
            deviceId: 'deviceId',
            deviceModelId: 'deviceModelId',
            locale: mapLocaleToAssistantLanguage(_currentLocale),
          });
          const userInfo = await _authService.getUserInfo(
            clientId,
            clientSecret,
          );
          browserWindow.webContents.send(
            'auth.resolveAuthentication',
            userInfo,
          );
        } catch (e) {
          browserWindow.webContents.send('auth.rejectAuthentication', e);
        }
      },
    )
    .on('auth.requestLogout', () => {
      try {
        _storeService.clearAuthData();
        browserWindow.webContents.send('auth.resolveLogout');
      } catch (e) {
        browserWindow.webContents.send('auth.rejectLogout', e);
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
        if (_assistant) {
          if (!_textConversation) {
            _textConversation = _assistant.startTextConversation({
              encoding: AudioOutEncoding.MP3,
              sampleRateHertz: 16000,
              volumePercentage: 100,
            });
            _textConversation
              .on('data', response => {
                browserWindow.webContents.send('chat.receiveMessage', response);
              })
              .on('end', () => {
                _textConversation = null;
              });
          }
          browserWindow.webContents.send(
            _textConversation.send(text)
              ? 'chat.resolveSendMessage'
              : 'chat.rejectSendMessage',
            text,
          );
          return;
        }
        browserWindow.webContents.send(
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
        if (_assistant) {
          if (!_audioConversation) {
            _audioConversation = _assistant.startAudioConversation();
            _audioConversation
              .on('data', (response: AssistantResponse) => {
                browserWindow.webContents.send('chat.receiveMessage', response);
              })
              .on('end', () => {
                _audioConversation = null;
              });
          }
          browserWindow.webContents.send(
            _audioConversation.send(audio)
              ? 'chat.resolveSendAudio'
              : 'chat.rejectSendAudio',
          );
          return;
        }
        browserWindow.webContents.send(
          'chat.rejectSendAudio',
          new Error('Unable to send audio'),
        );
      },
    )
    .on('app.requestModalOpening', (_: Event, ref: string) => {
      try {
        const modal = _modalsService.open(ref);
        modal.once('closed', () =>
          browserWindow.webContents.send('app.resolveModalOpening'),
        );
      } catch (e) {
        browserWindow.webContents.send('app.rejectModalOpening', e);
      }
    })
    .on(
      'i18n.requestLocaleUpdate',
      (_: Event, { locale }: { locale: Locale }) => {
        if (!supportedLocales.includes(locale)) {
          throw new Error('Locale not supported');
        }

        _currentLocale = locale;

        if (_assistant) {
          _assistant.locale = mapLocaleToAssistantLanguage(locale);
        }
      },
    );

  browserWindow.once('closed', () => {
    ipcMain.removeAllListeners('auth.requestAuthentication');
    ipcMain.removeAllListeners('auth.requestLogout');
    ipcMain.removeAllListeners('chat.requestSendMessage');
    ipcMain.removeAllListeners('chat.requestSendAudio');
    ipcMain.removeAllListeners('chat.requestModalOpening');
  });

  return browserWindow;
};
