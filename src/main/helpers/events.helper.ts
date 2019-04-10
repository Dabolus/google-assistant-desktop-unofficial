import { Auth, AuthService } from '@services/auth.service';
import { BrowserWindow, BrowserWindowConstructorOptions, Event, ipcMain } from 'electron';
import { container } from './di.helper';

export class BrowserWindowWithEvents extends BrowserWindow {
  private _authService: Auth = container.get(AuthService);

  constructor(options?: BrowserWindowConstructorOptions) {
    super(options);

    ipcMain.on('auth.requestAuthentication', async (_: Event, {
      clientId = '',
      clientSecret = '',
    }: any) => {
      const oauth2Client = await this._authService.getAuthenticatedClient(clientId, clientSecret);
      this.webContents.send('auth.resolveAuthentication', oauth2Client.credentials);
    });
  }
}
