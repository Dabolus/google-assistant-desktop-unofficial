import { AppState } from '../app/app.model';
import { ChatState } from '../chat/chat.model';

export interface RootState {
  app: AppState;
  chat: ChatState;
}
