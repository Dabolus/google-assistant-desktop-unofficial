import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { attachEventListeners } from '../helpers/events.helper';
import { RootState } from './root/root.model';
import { rootReducer } from './root/root.reducer';
import { rootSaga } from './root/root.saga';
import { StoreConfig } from './store.model';

export const configure = (
  { initialState }: StoreConfig,
): Store<RootState> => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
  );
  const store = createStore(rootReducer, initialState, enhancer);
  attachEventListeners(store);

  sagaMiddleware.run(rootSaga);

  return store;
};
