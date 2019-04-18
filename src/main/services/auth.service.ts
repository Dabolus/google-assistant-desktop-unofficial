import { container, injectable } from '@helpers/di.helper';
import { BrowserWindow } from 'electron';
import { JWTInput, OAuth2Client } from 'google-auth-library';
import http from 'http';
import { Assistant } from 'nodejs-assistant';
import { parse as parseQuerystring } from 'querystring';
import { parse as parseUrl } from 'url';
import { Store, StoreService } from './store.service';

export interface Auth {
  getCredentials(clientId?: string, clientSecret?: string): Promise<JWTInput>;
  authenticateClient(clientId: string, clientSecret: string): Promise<string>;
}

@injectable()
export class AuthService implements Auth {
  private _client: OAuth2Client;
  private _storeService: Store = container.get(StoreService);

  public async getCredentials(clientId?: string, clientSecret?: string): Promise<JWTInput> {
    const cachedCredentials = this._storeService.getCredentials();
    if (cachedCredentials) {
      return cachedCredentials;
    }
    const code = await this.authenticateClient(
      clientId || this._storeService.getClientId(),
      clientSecret || this._storeService.getClientSecret(),
    );
    const { tokens: { refresh_token } } = await this._client.getToken(code);
    const credentials = {
      type: 'authorized_user',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token,
    };
    this._storeService.setCredentials(credentials);
    return credentials;
  }

  public authenticateClient(clientId: string, clientSecret: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!clientId || !clientSecret) {
        return reject(`Missing client id or client secret`);
      }

      // create an oAuth client to authorize the API calls.
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        'http://localhost:45515',
      );

      let window: BrowserWindow;

      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/assistant-sdk-prototype',
      });

      // Open an http server to accept the oauth callback.
      const server = http
        .createServer(({ url }, res) => {
          // acquire the code from the querystring, and close the web server.
          const { query } = parseUrl(url);
          const { code } = parseQuerystring(query);
          res.end('Success! You can now close this window if it does not close automatically.');
          server.close();
          window.destroy();

          this._client = oAuth2Client;
          resolve(code as string);
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
}
