import { Action } from 'redux';
import { RootState } from './root/root.model';

export interface StoreConfig {
  initialState: RootState;
}

export interface FluxStandardAction<T extends string> extends Action<T> {
  payload?: { [key: string]: any } | Promise<{ [key: string]: any }> | Error;
  error?: true;
  meta?: any;
}
