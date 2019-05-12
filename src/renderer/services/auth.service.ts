import { injectable } from '@helpers/di.helper';
import { ipcRenderer } from 'electron';

export interface Auth {
  getClientId(): string;
  getClientSecret(): string;
  authenticate(clientId?: string, clientSecret?: string): void;
  logout(): void;
}

@injectable()
export class AuthService implements Auth {
  public getClientId() {
    return 'clientId'; // TODO
  }

  public getClientSecret() {
    return 'clientSecret'; // TODO
  }

  public authenticate(clientId?: string, clientSecret?: string): void {
    ipcRenderer.send('auth.requestAuthentication', { clientId, clientSecret });
  }

  public logout(): void {
    ipcRenderer.send('auth.requestLogout');
  }
}
