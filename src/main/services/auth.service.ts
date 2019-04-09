import { container, injectable } from '@helpers/di.helper';
import { BrowserWindow } from 'electron';
import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import { parse as parseQuerystring } from 'querystring';
import { parse as parseUrl } from 'url';
import { Store, StoreService } from './store.service';

export interface Auth {
  getAuthenticatedClient(clientId: string, clientSecret: string): Promise<OAuth2Client>;
}

@injectable()
export class AuthService implements Auth {
  private _client: OAuth2Client;
  private _storeService: Store = container.get(StoreService);

  public getAuthenticatedClient(clientId: string, clientSecret: string): Promise<OAuth2Client> {
    return new Promise(async (resolve, reject) => {
      if (this._client) {
        await this._refreshClientTokenIfNeeded();
        return resolve(this._client);
      }

      // create an oAuth client to authorize the API calls.
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        'http://localhost:45515',
      );

      const cachedCredentials = this._storeService.getCredentials();
      if (cachedCredentials) {
        oAuth2Client.setCredentials(cachedCredentials);
        this._client = oAuth2Client;
        await this._refreshClientTokenIfNeeded();
        return resolve(this._client);
      }

      let window: BrowserWindow;

      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/assistant-sdk-prototype',
      });

      // Open an http server to accept the oauth callback.
      const server = http
        .createServer(async ({ url }, res) => {
          // acquire the code from the querystring, and close the web server.
          const { query } = parseUrl(url);
          const { code } = parseQuerystring(query);
          res.end('Success! You can now close this window if it does not close automatically.');
          server.close();
          window.destroy();

          // Now that we have the code, use that to acquire tokens.
          const { tokens } = await oAuth2Client.getToken(code as string);
          // Make sure to set the credentials on the OAuth2 client.
          this._storeService.setCredentials(tokens);
          oAuth2Client.setCredentials(tokens);
          this._client = oAuth2Client;
          resolve(oAuth2Client);
        })
        .listen(45515, () => {
          // open the browser to the authorize url to start the workflow
          window = new BrowserWindow({
            alwaysOnTop: true,
            center: true,
            closable: false,
            frame: false,
            maximizable: false,
            minimizable: false,
            modal: true,
            movable: false,
            resizable: false,
          });
          window.loadURL(authorizeUrl);
        });
    });
  }

  private async _refreshClientTokenIfNeeded(): Promise<void> {
    if (!this._isClientTokenExpiring()) {
      return;
    }
    const { credentials } = await this._client.refreshAccessToken();
    this._storeService.setCredentials(credentials);
    this._client.setCredentials(credentials);
    return;
  }

  private _isClientTokenExpiring(): boolean {
    const expiryDate = this._client.credentials.expiry_date;
    return expiryDate ? expiryDate <=
        ((new Date()).getTime() + this._client.eagerRefreshThresholdMillis) :
        false;
  }
}
