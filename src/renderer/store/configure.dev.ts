import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { rootSagas } from './root/root.sagas';
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
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = devCompose(
    applyMiddleware(
      sagaMiddleware,
      createLogger({
        level: 'info',
        collapsed: true,
      }),
    ),
  );
  const store = createStore(rootReducer, initialState, enhancer);

  // TODO: remove this useless explicit cast as soon as TypeScript gets fixed
  sagaMiddleware.run(...(rootSagas as [any]));

  if (module.hot) {
    module.hot.accept('./root/root.reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};
