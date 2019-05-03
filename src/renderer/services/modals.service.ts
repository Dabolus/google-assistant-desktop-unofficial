import { injectable } from '@helpers/di.helper';
import { Event, ipcRenderer } from 'electron';

export interface Modals {
  open(ref: string): Promise<any>;
}

@injectable()
export class ModalsService implements Modals {
  public open(ref: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('app.resolveModalOpening', (_: Event, data: any) => {
        resolve(data);
      });
      ipcRenderer.once('app.rejectModalOpening', (_: Event, error: Error) => {
        reject(error);
      });
      ipcRenderer.send('app.requestModalOpening', ref);
    });
  }
}
