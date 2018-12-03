import { configure } from '@shared/store/configure';

export const store = configure('main', {
  initialState: {
    app: {
      page: '',
      menuOpened: false,
    },
  },
});
