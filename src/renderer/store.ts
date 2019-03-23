import { configure } from '@gadu/store/lib/configure';
import { getInitialStateRenderer } from 'electron-redux';

export const store = configure('renderer', {
  initialState: getInitialStateRenderer(),
});
