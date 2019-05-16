import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { attachEventListeners } from '../helpers/events.helper';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { rootSaga } from './root/root.saga';
import { StoreConfig } from './store.model';

declare global {
  interface Window {
    process?: NodeJS.Process;
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
    applyMiddleware(sagaMiddleware),
  );
  const store = createStore(rootReducer, initialState, enhancer);
  attachEventListeners(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./root/root.reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
};
