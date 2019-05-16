import { Action } from 'redux';
import { RootState } from './root/root.model';

export interface StoreConfig {
  initialState: RootState;
}

export type FluxStandardActionPayload = { [key: string]: unknown } | Promise<{ [key: string]: unknown }> | Error;

export interface FluxStandardAction<
  T extends string = string,
  P extends FluxStandardActionPayload = FluxStandardActionPayload,
  M = unknown,
> extends Action<T> {
  payload?: P;
  error?: true;
  meta?: M;
}
