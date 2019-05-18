import { AssistantResponse } from 'nodejs-assistant';
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
export type ChatActionUpdateInput =
  FluxStandardAction<ChatActionType.UPDATE_INPUT, {
    text: string;
  }>;

export type ChatActionSendMessageRequested =
  FluxStandardAction<ChatActionType.SEND_MESSAGE_REQUESTED, {
    text: string;
  }>;

export type ChatActionSendMessageResolved =
  FluxStandardAction<ChatActionType.SEND_MESSAGE_RESOLVED, {
    text: string;
  }>;

export type ChatActionSendMessageRejected =
  FluxStandardAction<ChatActionType.SEND_MESSAGE_REJECTED, Error>;

export type ChatActionReceiveMessage =
  FluxStandardAction<ChatActionType.RECEIVE_MESSAGE, {
    content: AssistantResponse;
  }>;

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
  error: true,
  payload: error,
});

export const receiveMessage = (content: AssistantResponse): ChatActionReceiveMessage => ({
  type: ChatActionType.RECEIVE_MESSAGE,
  payload: {
    content,
  },
});
