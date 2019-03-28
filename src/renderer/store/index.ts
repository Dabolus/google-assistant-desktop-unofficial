import { configure } from '@store/configure';
import { RootState } from '@store/root/root.model';
import { initialState as appInitialState } from './app/app.reducer';
import { initialState as chatInitialState } from './chat/chat.reducer';
import { initialState as wizardInitialState } from './wizard/wizard.reducer';

export const initialState: RootState = {
  app: appInitialState,
  chat: chatInitialState,
  wizard: wizardInitialState,
};

export const store = configure({ initialState });
