import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { StoreConfig } from './store.model';

declare global {
  interface Window {
    process?: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: typeof compose = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configure = (
  { initialState }: StoreConfig,
): Store<RootState> => {
  const middlewares: Middleware[] = [
    promiseMiddleware,
    createLogger({
      level: 'info',
      collapsed: true,
    }),
  ];
  const enhancer = devCompose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./root/root.reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};
