import { injectable } from '@helpers/di.helper';
import { Event, ipcRenderer } from 'electron';

export interface Chat {
  sendMessage(text: string): Promise<void>;
}

@injectable()
export class ChatService implements Chat {
  public sendMessage(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('chat.resolveSendMessage', (_: Event, data: any) => {
        resolve(data);
      });
      ipcRenderer.once('chat.rejectSendMessage', (_: Event, error: any) => {
        reject(error);
      });
      ipcRenderer.send('chat.requestSendMessage', text);
    });
  }
}
