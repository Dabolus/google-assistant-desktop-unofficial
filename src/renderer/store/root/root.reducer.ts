import { combineReducers } from 'redux';
import { appReducer } from '../app/app.reducer';

export const rootReducer = combineReducers({
  app: appReducer,
});
