import { injectable } from '@helpers/di.helper';
import { ipcRenderer } from 'electron';
import { AssistantQueryOptions } from 'nodejs-assistant';

export interface Chat {
  sendMessage(text: string, options?: AssistantQueryOptions): void;
  sendAudio(data: Blob, options?: AssistantQueryOptions): Promise<void>;
}

@injectable()
export class ChatService implements Chat {
  public sendMessage(text: string, options?: AssistantQueryOptions): void {
    ipcRenderer.send('chat.requestSendMessage', {
      text,
      options,
    });
  }

  public async sendAudio(
    data: Blob,
    options?: AssistantQueryOptions,
  ): Promise<void> {
    const arrayBuffer = await new Response(data).arrayBuffer();
    const audio = Buffer.from(arrayBuffer);
    ipcRenderer.send('chat.requestSendAudio', {
      audio,
      options,
    });
  }
}
