import {
  forwardToMain,
  forwardToRenderer,
  replayActionMain,
  replayActionRenderer,
  triggerAlias,
} from 'electron-redux';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { AppState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { StoreModuleConfig } from './store.model';

const getMiddlewares = (scope: 'main' | 'renderer'): Middleware[] => {
  const baseMiddlewares = [
    thunk,
    promise,
  ];
  return scope === 'main' ? [
    triggerAlias,
    ...baseMiddlewares,
    forwardToRenderer,
  ] : [
    forwardToMain,
    ...baseMiddlewares,
  ];
};

const replayAction = (scope: 'main' | 'renderer', store: Store<AppState>): Store<AppState> => {
  return scope === 'main' ? replayActionMain(store) : replayActionRenderer(store);
};

export const configure = (
  scope: 'main' | 'renderer',
  initialState: StoreModuleConfig,
): Store<AppState> => {
  const middlewares = getMiddlewares(scope);
  const enhancer = compose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancer);

  return replayAction(scope, store);
};
