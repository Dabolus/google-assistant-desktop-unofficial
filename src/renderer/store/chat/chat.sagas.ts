import { container } from '@helpers/di.helper';
import { Chat, ChatService } from '@services/chat.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ChatActionSendMessageRequested, ChatActionType, rejectMessageSend, resolveMessageSend } from './chat.actions';

const chatService: Chat = container.get(ChatService);

function* handleMessageSend({
  payload: { text },
}: ChatActionSendMessageRequested) {
  try {
    yield call(chatService.sendMessage, text);
    yield put(resolveMessageSend());
  } catch (e) {
    yield put(rejectMessageSend(e));
  }
}

export const chatSagas = [
  takeLatest(ChatActionType.SEND_MESSAGE_REQUESTED, handleMessageSend),
];
