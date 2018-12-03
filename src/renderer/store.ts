import { configure } from '@shared/store/configure';
import { getInitialStateRenderer } from 'electron-redux';

export const store = configure('renderer', {
  initialState: getInitialStateRenderer(),
});
