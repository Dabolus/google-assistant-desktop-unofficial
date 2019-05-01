export enum MessageType {
  OUT = 'OUT',
  IN = 'IN',
}

export interface Message {
  type: MessageType;
  text: string;
  timestamp: Date;
}

export interface ChatState {
  text: string;
  error: Error;
  history: Message[];
}
