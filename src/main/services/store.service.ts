import { injectable } from '@helpers/di.helper';
import ElectronStore from 'electron-store';
import { Credentials } from 'google-auth-library';

export interface Store {
  getClientId(): string;
  setClientId(clientId: string): void;
  getClientSecret(): string;
  setClientSecret(clientSecret: string): void;
  getCredentials(): Credentials;
  setCredentials(credentials: Credentials): void;
}

@injectable()
export class StoreService implements Store {
  private _store = new ElectronStore({
    // NOTE: we encrypt the store to make the JSON file unreadable.
    // Of course the user can still find the encryption key in the
    // source code and use it to decrypt the store, but at least
    // we provide some sort of obfuscation against other apps and
    // against the user to avoid manual editing of our config,
    // as well as making it possible to easily check the integrity
    // of the file on decryption.
    encryptionKey: 'b88ea844-cb37-4fcd-873d-763913d7ff24',
    // Same principle as above. Using an unknown extension will
    // generally deter the user from editing the config file manually.
    fileExtension: 'gad',
    // TODO: current available types are deprecated. Update them
    // or move them to internal typings
  } as any);

  public getClientId() {
    return this._store.get('clientId');
  }

  public setClientId(clientId: string) {
    return this._store.set('clientId', clientId);
  }

  public getClientSecret() {
    return this._store.get('clientSecret');
  }

  public setClientSecret(clientSecret: string) {
    return this._store.set('clientSecret', clientSecret);
  }

  public getCredentials() {
    return this._store.get('credentials');
  }

  public setCredentials(credentials: Credentials) {
    return this._store.set('credentials', credentials);
  }
}