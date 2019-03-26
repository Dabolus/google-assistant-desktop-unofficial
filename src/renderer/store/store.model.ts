import { Action } from 'redux';
import { RootState } from './root/root.model';

export interface StoreConfig {
  initialState: RootState;
}

export interface FluxStandardAction<T = any> extends Action<T> {
  payload?: { [key: string]: any } | Error;
  error?: boolean;
  meta?: any;
}
