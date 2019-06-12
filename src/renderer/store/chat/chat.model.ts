export enum MessageType {
  OUT = 'OUT',
  IN = 'IN',
}

export interface Message {
  type: MessageType;
  text: string;
  timestamp: number;
}

export interface ChatState {
  text: string;
  error: Error;
  history: Message[];
  conversationState: Uint8Array;
}
