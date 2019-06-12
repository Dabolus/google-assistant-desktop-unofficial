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

const audioElement = new Audio();
let mediaSource: MediaSource = null;
let timeoutHandle: number = null;
let tempBuffer: Uint8Array[] = [];

function handleMessageReceive({
  payload: {
    content: { audio },
  },
}: ChatActionReceiveMessage) {
  if (audio && audio.length) {
    if (!mediaSource) {
      mediaSource = new MediaSource();
      audioElement.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener('sourceopen', () => {
        const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
        sourceBuffer.addEventListener('updateend', () => {
          if (tempBuffer.length) {
            sourceBuffer.appendBuffer(tempBuffer.shift());
          }
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
          // FIXME: detect end of stream instead of using a timeout
          timeoutHandle = window.setTimeout(() => {
            mediaSource.endOfStream();
            mediaSource = null;
          }, 1500);
        });
        sourceBuffer.appendBuffer(audio);
        audioElement.play();
      });
    } else {
      tempBuffer.push(audio);
    }
  }
}

export const chatSagas = [
  takeLatest(ChatActionType.SEND_MESSAGE_REQUESTED, handleMessageSend),
  takeLatest(ChatActionType.SEND_AUDIO_REQUESTED, handleAudioSend),
  takeLatest(ChatActionType.RECEIVE_MESSAGE, handleMessageReceive),
];
