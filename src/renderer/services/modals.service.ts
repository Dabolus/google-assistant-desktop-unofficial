import { injectable } from '@helpers/di.helper';
import { Event, ipcRenderer } from 'electron';

export interface Modals {
  open(ref: string): void;
}

@injectable()
export class ModalsService implements Modals {
  public open(ref: string): void {
    ipcRenderer.send('app.requestModalOpening', ref);
  }
}
