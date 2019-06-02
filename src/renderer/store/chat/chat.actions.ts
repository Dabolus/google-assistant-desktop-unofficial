import { AssistantResponse } from 'nodejs-assistant';
import { FluxStandardAction } from '../store.model';

// Action types
export enum ChatActionType {
  UPDATE_INPUT = 'UPDATE_INPUT',

  SEND_MESSAGE_REQUESTED = 'SEND_MESSAGE_REQUESTED',
  SEND_MESSAGE_RESOLVED = 'SEND_MESSAGE_RESOLVED',
  SEND_MESSAGE_REJECTED = 'SEND_MESSAGE_REJECTED',

  SEND_AUDIO_REQUESTED = 'SEND_AUDIO_REQUESTED',
  SEND_AUDIO_RESOLVED = 'SEND_AUDIO_RESOLVED',
  SEND_AUDIO_REJECTED = 'SEND_AUDIO_REJECTED',

  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
}

// Action interfaces
export type ChatActionUpdateInput = FluxStandardAction<
  ChatActionType.UPDATE_INPUT,
  {
    text: string;
  }
>;

export type ChatActionSendMessageRequested = FluxStandardAction<
  ChatActionType.SEND_MESSAGE_REQUESTED,
  {
    text: string;
    conversationState?: Buffer;
  }
>;

export type ChatActionSendMessageResolved = FluxStandardAction<
  ChatActionType.SEND_MESSAGE_RESOLVED,
  {
    text: string;
  }
>;

export type ChatActionSendMessageRejected = FluxStandardAction<
  ChatActionType.SEND_MESSAGE_REJECTED,
  Error
>;

export type ChatActionSendAudioRequested = FluxStandardAction<
  ChatActionType.SEND_AUDIO_REQUESTED,
  {
    audio: Buffer;
    conversationState?: Buffer;
  }
>;

export type ChatActionSendAudioResolved = FluxStandardAction<
  ChatActionType.SEND_AUDIO_RESOLVED
>;

export type ChatActionSendAudioRejected = FluxStandardAction<
  ChatActionType.SEND_AUDIO_REJECTED,
  Error
>;

export type ChatActionReceiveMessage = FluxStandardAction<
  ChatActionType.RECEIVE_MESSAGE,
  {
    content: AssistantResponse;
  }
>;

export type ChatAction =
  | ChatActionUpdateInput
  | ChatActionSendMessageRequested
  | ChatActionSendMessageResolved
  | ChatActionSendMessageRejected
  | ChatActionSendAudioRequested
  | ChatActionSendAudioResolved
  | ChatActionSendAudioRejected
  | ChatActionReceiveMessage;

// Actions
export const updateInput = (text: string): ChatActionUpdateInput => ({
  type: ChatActionType.UPDATE_INPUT,
  payload: {
    text,
  },
});

export const requestMessageSend = (
  text: string,
  conversationState?: Buffer,
): ChatActionSendMessageRequested => ({
  type: ChatActionType.SEND_MESSAGE_REQUESTED,
  payload: {
    text,
    conversationState,
  },
});

export const resolveMessageSend = (
  text: string,
): ChatActionSendMessageResolved => ({
  type: ChatActionType.SEND_MESSAGE_RESOLVED,
  payload: {
    text,
  },
});

export const rejectMessageSend = (
  error: Error,
): ChatActionSendMessageRejected => ({
  type: ChatActionType.SEND_MESSAGE_REJECTED,
  error: true,
  payload: error,
});

export const requestAudioSend = (
  audio: Buffer,
  conversationState?: Buffer,
): ChatActionSendAudioRequested => ({
  type: ChatActionType.SEND_AUDIO_REQUESTED,
  payload: {
    audio,
    conversationState,
  },
});

export const resolveAudioSend = (): ChatActionSendAudioResolved => ({
  type: ChatActionType.SEND_AUDIO_RESOLVED,
});

export const rejectAudioSend = (error: Error): ChatActionSendAudioRejected => ({
  type: ChatActionType.SEND_AUDIO_REJECTED,
  error: true,
  payload: error,
});

export const receiveMessage = (
  content: AssistantResponse,
): ChatActionReceiveMessage => ({
  type: ChatActionType.RECEIVE_MESSAGE,
  payload: {
    content,
  },
});
