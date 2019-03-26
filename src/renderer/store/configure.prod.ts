import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { StoreConfig } from './store.model';

export const configure = (
  { initialState }: StoreConfig,
): Store<RootState> => {
  const middlewares: Middleware[] = [
    promiseMiddleware,
  ];
  const enhancer = compose(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};
