import { FluxStandardAction } from '../store.model';

// Action types
export enum ChatActionType {
  UPDATE_INPUT = 'UPDATE_INPUT',

  SEND_MESSAGE_REQUESTED = 'SEND_MESSAGE_REQUESTED',
  SEND_MESSAGE_RESOLVED = 'SEND_MESSAGE_RESOLVED',
  SEND_MESSAGE_REJECTED = 'SEND_MESSAGE_REJECTED',

  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
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
  FluxStandardAction<ChatActionType.SEND_MESSAGE_RESOLVED> {
  payload: {
    text: string;
  };
}

export interface ChatActionSendMessageRejected extends
  FluxStandardAction<ChatActionType.SEND_MESSAGE_REJECTED> {
  payload: {
    error: Error;
  };
}

export interface ChatActionReceiveMessage extends
  FluxStandardAction<ChatActionType.RECEIVE_MESSAGE> {
  payload: {
    // Note: we will start by supporting text only
    // conversations, rich conversations will come later on.
    text: string;
  };
}

export type ChatAction =
  | ChatActionUpdateInput
  | ChatActionSendMessageRequested
  | ChatActionSendMessageResolved
  | ChatActionSendMessageRejected
  | ChatActionReceiveMessage;

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

export const resolveMessageSend = (text: string): ChatActionSendMessageResolved => ({
  type: ChatActionType.SEND_MESSAGE_RESOLVED,
  payload: {
    text,
  },
});

export const rejectMessageSend = (error: Error): ChatActionSendMessageRejected => ({
  type: ChatActionType.SEND_MESSAGE_REJECTED,
  payload: {
    error,
  },
});

export const receiveMessage = (text: string): ChatActionReceiveMessage => ({
  type: ChatActionType.RECEIVE_MESSAGE,
  payload: {
    text,
  },
});
