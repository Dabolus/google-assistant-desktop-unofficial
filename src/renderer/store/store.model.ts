import { Action } from 'redux';
import { RootState } from './root/root.model';

export interface StoreConfig {
  initialState: RootState;
}

interface FluxStandardNormalActionPayload { [key: string]: unknown };
type FluxStandardErrorActionPayload = Error;
export type FluxStandardActionPayload = FluxStandardNormalActionPayload | FluxStandardErrorActionPayload;

interface FluxStandardCommonAction<
  T extends string = string,
  M = unknown,
> extends Action<T> {
  meta?: M;
}

interface FluxStandardNormalAction<
  T extends string = string,
  P extends FluxStandardNormalActionPayload = FluxStandardNormalActionPayload,
  M = unknown,
> extends FluxStandardCommonAction<T, M> {
  payload?: P;
}

interface FluxStandardErrorAction<
  T extends string = string,
  E extends FluxStandardErrorActionPayload = FluxStandardErrorActionPayload,
  M = unknown,
> extends FluxStandardCommonAction<T, M> {
  payload?: E;
  error: true;
}

export type FluxStandardAction<
  T extends string = string,
  P extends FluxStandardActionPayload = FluxStandardActionPayload,
  M = unknown,
> = P extends FluxStandardErrorActionPayload
  ? FluxStandardErrorAction<T, P, M>
  : P extends FluxStandardNormalActionPayload
    ? FluxStandardNormalAction<T, P, M>
    : never;
