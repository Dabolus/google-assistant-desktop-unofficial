import { injectable } from '@helpers/di.helper';
import { BrowserWindow } from 'electron';
import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import { parse as parseQuerystring } from 'querystring';
import { parse as parseUrl } from 'url';

export interface Auth {
  getAuthenticatedClient(clientId: string, clientSecret: string): Promise<OAuth2Client>;
}

@injectable()
export class AuthService implements Auth {
  private _client: OAuth2Client;

  public getAuthenticatedClient(clientId: string, clientSecret: string): Promise<OAuth2Client> {
    return new Promise((resolve, reject) => {
      if (this._client) {
        return this._client;
      }

      let window: BrowserWindow;

      // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
      // which should be downloaded from the Google Developers Console.
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        'http://localhost:45515',
      );

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
}

export const getAuthenticatedClient = (
  clientId: string,
  clientSecret: string,
): Promise<OAuth2Client> => new Promise((resolve, reject) => {
  let window: BrowserWindow;

  // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
  // which should be downloaded from the Google Developers Console.
  const oAuth2Client = new OAuth2Client(
    clientId,
    clientSecret,
    'http://localhost:45515',
  );

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
      oAuth2Client.setCredentials(tokens);
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
