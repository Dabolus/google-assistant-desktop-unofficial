import { Store } from 'redux';
import { AppState } from './root/root.model';
import { StoreModuleConfig } from './store.model';

// tslint:disable-next-line:no-var-requires
export const { configure } = require(process.env.NODE_ENV === 'production'
  ? './configure.prod'
  : './configure.dev') as { configure: (config: StoreModuleConfig) => Store<AppState> };
