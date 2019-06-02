import { container } from '@helpers/di.helper';
import { Chat, ChatService } from '@services/chat.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ChatActionSendMessageRequested,
  ChatActionType,
  rejectMessageSend,
  ChatActionSendAudioRequested,
  rejectAudioSend,
  ChatActionReceiveMessage,
} from './chat.actions';

const chatService: Chat = container.get(ChatService);

function* handleMessageSend({
  payload: { text, conversationState },
}: ChatActionSendMessageRequested) {
  try {
    yield call(chatService.sendMessage, text, { conversationState });
  } catch (e) {
    yield put(rejectMessageSend(e));
  }
}

function* handleAudioSend({
  payload: { audio, conversationState },
}: ChatActionSendAudioRequested) {
  try {
    yield call(chatService.sendAudio, audio, { conversationState });
  } catch (e) {
    yield put(rejectAudioSend(e));
  }
}

function handleAudioReceive({
  payload: {
    content: { audio },
  },
}: ChatActionReceiveMessage) {
  const arrayBuffer = audio.buffer.slice(
    audio.byteOffset,
    audio.byteOffset + audio.byteLength,
  );
  const audioContext = new AudioContext();
  audioContext.decodeAudioData(arrayBuffer, buffer => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  });
}

export const chatSagas = [
  takeLatest(ChatActionType.SEND_MESSAGE_REQUESTED, handleMessageSend),
  takeLatest(ChatActionType.SEND_AUDIO_REQUESTED, handleAudioSend),
  takeLatest(ChatActionType.RECEIVE_MESSAGE, handleAudioReceive),
];
