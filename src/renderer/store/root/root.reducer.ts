import { combineReducers } from 'redux';
import { appReducer } from '../app/app.reducer';
import { chatReducer } from '../chat/chat.reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  chat: chatReducer,
});
