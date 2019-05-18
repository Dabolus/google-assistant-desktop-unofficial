import { injectable } from '@helpers/di.helper';
import { ipcRenderer } from 'electron';
import { AssistantQueryOptions } from 'nodejs-assistant';

export interface Chat {
  sendMessage(text: string, options?: AssistantQueryOptions): void;
}

@injectable()
export class ChatService implements Chat {
  public sendMessage(text: string, options?: AssistantQueryOptions): void {
    ipcRenderer.send('chat.requestSendMessage', {
      text,
      options,
    });
  }
}
