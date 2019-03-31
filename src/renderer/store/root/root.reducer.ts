import { combineReducers } from 'redux';
import { appReducer } from '../app/app.reducer';
import { authReducer } from '../auth/auth.reducer';
import { chatReducer } from '../chat/chat.reducer';
import { wizardReducer } from '../wizard/wizard.reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  chat: chatReducer,
  wizard: wizardReducer,
  auth: authReducer,
});
