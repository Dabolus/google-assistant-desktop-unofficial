export enum MessageType {
  OUT = 'OUT',
  IN = 'IN',
}

export interface Message {
  type: MessageType;
  content: string;
}

export interface ChatState {
  text: string;
  error: Error;
  history: Message[];
}
