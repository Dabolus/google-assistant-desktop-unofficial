import { Store } from 'redux';
import { RootState } from './root/root.model';
import { StoreConfig } from './store.model';

export const { configure } = require(process.env.NODE_ENV === 'production'
  ? './configure.prod'
  : './configure.dev') as {
    configure: ({ initialState }: StoreConfig) => Store<RootState>,
  };
