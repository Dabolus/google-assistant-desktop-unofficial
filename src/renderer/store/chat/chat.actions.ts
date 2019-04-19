import { FluxStandardAction } from '../store.model';

// Action types
export enum ChatActionType {
  UPDATE_INPUT = 'UPDATE_INPUT',

  SEND_MESSAGE_REQUESTED = 'SEND_MESSAGE_REQUESTED',
  SEND_MESSAGE_RESOLVED = 'SEND_MESSAGE_RESOLVED',
  SEND_MESSAGE_REJECTED = 'SEND_MESSAGE_REJECTED',
}

// Action interfaces
export interface ChatActionUpdateInput extends
  FluxStandardAction<ChatActionType.UPDATE_INPUT> {
  payload: {
    text: string;
  };
}

export interface ChatActionSendMessageRequested extends
  FluxStandardAction<ChatActionType.SEND_MESSAGE_REQUESTED> {
  payload: {
    text: string;
  };
}

export interface ChatActionSendMessageResolved extends
  FluxStandardAction<ChatActionType.SEND_MESSAGE_RESOLVED> {}

export interface ChatActionSendMessageRejected extends
  FluxStandardAction<ChatActionType.SEND_MESSAGE_REJECTED> {
  payload: {
    error: Error;
  };
}

export type ChatAction =
  | ChatActionUpdateInput
  | ChatActionSendMessageRequested
  | ChatActionSendMessageResolved
  | ChatActionSendMessageRejected;

// Actions
export const updateInput = (text: string): ChatActionUpdateInput => ({
  type: ChatActionType.UPDATE_INPUT,
  payload: {
    text,
  },
});

export const requestMessageSend = (text: string): ChatActionSendMessageRequested => ({
  type: ChatActionType.SEND_MESSAGE_REQUESTED,
  payload: {
    text,
  },
});

export const resolveMessageSend = (): ChatActionSendMessageResolved => ({
  type: ChatActionType.SEND_MESSAGE_RESOLVED,
});

export const rejectMessageSend = (error: Error): ChatActionSendMessageRejected => ({
  type: ChatActionType.SEND_MESSAGE_REJECTED,
  payload: {
    error,
  },
});
