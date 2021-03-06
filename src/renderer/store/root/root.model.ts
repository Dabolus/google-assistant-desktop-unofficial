import { AppState } from '../app/app.model';
import { AuthState } from '../auth/auth.model';
import { ChatState } from '../chat/chat.model';
import { WizardState } from '../wizard/wizard.model';

export interface RootState {
  app: AppState;
  chat: ChatState;
  wizard: WizardState;
  auth: AuthState;
}
