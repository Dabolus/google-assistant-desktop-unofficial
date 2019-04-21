import { Auth, AuthService } from '@services/auth.service';
import { BrowserWindow, BrowserWindowConstructorOptions, Event, ipcMain } from 'electron';
import { Assistant, TextConversation } from 'nodejs-assistant';
import { container } from './di.helper';

export class BrowserWindowWithEvents extends BrowserWindow {
  private _authService: Auth = container.get(AuthService);
  private _assistant: Assistant;
  private _textConversation: TextConversation;

  constructor(options?: BrowserWindowConstructorOptions) {
    super(options);

    ipcMain
      .on('auth.requestAuthentication', async (_: Event, {
        clientId,
        clientSecret,
      }: any) => {
        try {
          const credentials = await this._authService.getCredentials(clientId, clientSecret);
          this._assistant = new Assistant(credentials);
          this._textConversation = this._assistant.startTextConversation();
          this._textConversation
            .on('message', (text) => this.webContents.send('chat.receiveMessage', text));
          this.webContents.send('auth.resolveAuthentication');
        } catch (e) {
          this.webContents.send('auth.rejectAuthentication', e);
        }
      })
      .on('chat.requestSendMessage', (_: Event, text: string) => {
        if (this._textConversation) {
          if (this._textConversation.send(text)) {
            this.webContents.send('chat.resolveSendMessage');
          } else {
            this.webContents.send('chat.rejectSendMessage', new Error('Unable to send message'));
          }
        }
      });
  }
}
