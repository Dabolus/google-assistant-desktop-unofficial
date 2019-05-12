import { rejectModalOpening, resolveModalOpening, setTheme } from '@store/app/app.actions';
import {
  rejectAuthentication,
  rejectLogout,
  requestLogout,
  resolveAuthentication,
  resolveLogout,
} from '@store/auth/auth.actions';
import { receiveMessage, rejectMessageSend, resolveMessageSend } from '@store/chat/chat.actions';
import { Event, ipcRenderer } from 'electron';
import { AssistantResponse } from 'nodejs-assistant';
import { Store } from 'redux';

export const attachEventListeners = (store: Store) => {
  ipcRenderer
    .on('app.setTheme', (_: Event, theme: string) => {
      store.dispatch(setTheme(theme));
    })
    .on('chat.receiveMessage', (_: Event, response: AssistantResponse) => {
      store.dispatch(receiveMessage(response));
    })
    .on('auth.requestLogout', () => {
      store.dispatch(requestLogout());
    })
    .on('auth.resolveLogout', (_: Event) => {
      store.dispatch(resolveLogout());
    })
    .on('auth.rejectLogout', (_: Event, error: Error) => {
      store.dispatch(rejectLogout(error));
    })
    .on('auth.resolveAuthentication', (_: Event) => {
      store.dispatch(resolveAuthentication());
    })
    .on('auth.rejectAuthentication', (_: Event, error: Error) => {
      store.dispatch(rejectAuthentication(error));
    })
    .on('chat.resolveSendMessage', (_: Event, text: string) => {
      store.dispatch(resolveMessageSend(text));
    })
    .on('chat.rejectSendMessage', (_: Event, error: Error) => {
      store.dispatch(rejectMessageSend(error));
    })
    .on('app.resolveModalOpening', (_: Event, data: any) => {
      store.dispatch(resolveModalOpening(data));
    })
    .on('app.rejectModalOpening', (_: Event, error: Error) => {
      store.dispatch(rejectModalOpening(error));
    });
};
