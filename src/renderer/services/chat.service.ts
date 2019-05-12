import { injectable } from '@helpers/di.helper';
import { Event, ipcRenderer } from 'electron';

export interface Chat {
  sendMessage(text: string): void;
}

@injectable()
export class ChatService implements Chat {
  public sendMessage(text: string): void {
    ipcRenderer.send('chat.requestSendMessage', text);
  }
}
