import { container, injectable } from '@helpers/di.helper';
import { BrowserWindow } from 'electron';
import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import { parse as parseQuerystring } from 'querystring';
import { parse as parseUrl } from 'url';
import { Modals, ModalsService } from './modals.service';
import { Store, StoreService, Credentials, Tokens } from './store.service';
import fetch from 'node-fetch';

export interface UserInfo {
  name: string;
  surname: string;
  displayName: string;
  picture: string;
}

export interface Auth {
  getCredentials(
    clientId?: string,
    clientSecret?: string,
  ): Promise<Credentials>;
  authenticateClient(clientId: string, clientSecret: string): Promise<Tokens>;
  getUserInfo(clientId?: string, clientSecret?: string): Promise<UserInfo>;
}

@injectable()
export class AuthService implements Auth {
  private _client: OAuth2Client;
  private _modalsService: Modals = container.get(ModalsService);
  private _storeService: Store = container.get(StoreService);

  public async getCredentials(
    clientId?: string,
    clientSecret?: string,
  ): Promise<Credentials> {
    const cachedCredentials = this._storeService.getCredentials();
    if (cachedCredentials) {
      return cachedCredentials;
    }
    const id = clientId || this._storeService.getClientId();
    const secret = clientSecret || this._storeService.getClientSecret();
    /* eslint-disable @typescript-eslint/camelcase */
    const { refresh_token } = await this.authenticateClient(id, secret);
    // If we got the code, id and secret were definitely valid, so we can save them for later use
    this._storeService.setClientId(id);
    this._storeService.setClientSecret(secret);
    const credentials: Credentials = {
      type: 'authorized_user',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refresh_token,
    };
    /* eslint-enable @typescript-eslint/camelcase */
    this._storeService.setCredentials(credentials);
    return credentials;
  }

  public authenticateClient(
    clientId: string,
    clientSecret: string,
  ): Promise<Tokens> {
    return new Promise((resolve, reject) => {
      if (!clientId || !clientSecret) {
        return reject(`Missing client id or client secret`);
      }

      // create an oAuth client to authorize the API calls.
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        'http://localhost:45515',
      );

      const cachedTokens = this._storeService.getTokens();
      if (cachedTokens && cachedTokens.expiry_date > Date.now()) {
        this._client = oAuth2Client;
        this._client.setCredentials(cachedTokens);
        return resolve(cachedTokens);
      }

      let window: BrowserWindow;

      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_type: 'offline',
        scope:
          'profile https://www.googleapis.com/auth/assistant-sdk-prototype',
      });

      // Open an http server to accept the oauth callback.
      const server = http
        .createServer(async ({ url }, res) => {
          // acquire the code from the querystring, and close the web server.
          const { query } = parseUrl(url);
          const { code } = parseQuerystring(query);
          res.end(
            'Success! You can now close this window if it does not close automatically.',
          );
          server.close();
          window.destroy();

          this._client = oAuth2Client;
          const { tokens } = await this._client.getToken(code as string);
          this._storeService.setTokens(tokens);
          this._client.setCredentials(tokens);
          resolve(tokens);
        })
        .listen(45515, () => {
          // open the browser to the authorize url to start the workflow
          window = this._modalsService.openUrl(authorizeUrl, {
            closable: false,
            frame: false,
          });
        });
    });
  }

  public async getUserInfo(
    clientId?: string,
    clientSecret?: string,
  ): Promise<UserInfo> {
    const id = clientId || this._storeService.getClientId();
    const secret = clientSecret || this._storeService.getClientSecret();
    if (!this._client) {
      await this.authenticateClient(id, secret);
      // If the promise didn't reject, id and secret were definitely valid, so we can save them for later use
      this._storeService.setClientId(id);
      this._storeService.setClientSecret(secret);
    }
    const { token } = await this._client.getAccessToken();
    const res = await fetch(
      'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names,person.photos',
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const {
      names: [
        {
          givenName: name = '',
          familyName: surname = '',
          displayName = '',
        } = {},
      ] = [],
      photos: [{ url: picture = '' } = {}] = [],
    } = await res.json();
    return {
      name,
      surname,
      displayName,
      picture,
    };
  }
}
