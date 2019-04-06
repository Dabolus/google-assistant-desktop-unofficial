import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { rootSagas } from './root/root.sagas';
import { StoreConfig } from './store.model';

export const configure = (
  { initialState }: StoreConfig,
): Store<RootState> => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
  );
  const store = createStore(rootReducer, initialState, enhancer);

  // TODO: remove this useless explicit cast as soon as TypeScript gets fixed
  sagaMiddleware.run(...(rootSagas as [any]));

  return store;
};
