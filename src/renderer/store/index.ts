import { configure } from '@store/configure';
import { RootState } from '@store/root/root.model';

const initialState: RootState = {
  app: {
    page: '',
    menuOpened: false,
  },
  chat: {
    text: '',
  },
};

export const store = configure({ initialState });
