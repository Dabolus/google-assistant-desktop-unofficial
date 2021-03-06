import { injectable } from '@helpers/di.helper';
import { ipcRenderer } from 'electron';
import { AudioOutConfig } from 'nodejs-assistant';

interface AssistantQueryOptions {
  conversationState?: Uint8Array;
  audioOutConfig?: AudioOutConfig;
}

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
    const audio = new Uint8Array(arrayBuffer);
    ipcRenderer.send('chat.requestSendAudio', {
      audio,
      options,
    });
  }
}
