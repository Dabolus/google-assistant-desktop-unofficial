import { injectable } from '@helpers/di.helper';
import { Event, ipcRenderer } from 'electron';

export interface Auth {
  getClientId(): string;
  getClientSecret(): string;
  authenticate(clientId?: string, clientSecret?: string): Promise<string>;
}

@injectable()
export class AuthService implements Auth {
  public getClientId() {
    return 'clientId'; // TODO
  }

  public getClientSecret() {
    return 'clientSecret'; // TODO
  }

  public authenticate(clientId?: string, clientSecret?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('auth.resolveAuthentication', (_: Event, data: any) => {
        resolve(data);
      });
      ipcRenderer.once('auth.rejectAuthentication', (_: Event, error: any) => {
        reject(error);
      });
      ipcRenderer.send('auth.requestAuthentication', { clientId, clientSecret });
    });
  }
}
