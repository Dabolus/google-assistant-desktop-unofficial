import { configure } from '@gadu/store/lib/configure';

export const store = configure('main', {
  initialState: {
    app: {
      page: '',
      menuOpened: false,
    },
  },
});
