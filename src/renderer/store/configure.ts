import { Store } from 'redux';
import { RootState } from './root/root.model';
import { StoreConfig } from './store.model';

// tslint:disable-next-line:no-var-requires
export const { configure } = require(process.env.NODE_ENV === 'production'
  ? './configure.prod'
  : './configure.dev') as {
    configure: ({ initialState }: StoreConfig) => Store<RootState>,
  };
