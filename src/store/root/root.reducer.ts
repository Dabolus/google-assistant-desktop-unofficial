import { appReducer } from '@store/app/app.reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  appReducer,
});
