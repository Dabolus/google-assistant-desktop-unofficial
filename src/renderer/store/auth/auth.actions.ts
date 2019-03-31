import { FluxStandardAction } from '../store.model';

// Action types
export enum AuthActionType {
  UPDATE_CLIENT_ID = 'UPDATE_CLIENT_ID',
  UPDATE_CLIENT_SECRET = 'UPDATE_CLIENT_SECRET',
}

// Action interfaces
export interface AuthActionUpdateClientId extends
  FluxStandardAction<AuthActionType.UPDATE_CLIENT_ID> {
  payload: {
    clientId: string;
  };
}

export interface AuthActionUpdateClientSecret extends
  FluxStandardAction<AuthActionType.UPDATE_CLIENT_SECRET> {
  payload: {
    clientSecret: string;
  };
}

export type AuthAction = AuthActionUpdateClientId | AuthActionUpdateClientSecret;

// Actions
export const updateClientId = (clientId: string): AuthActionUpdateClientId => ({
  type: AuthActionType.UPDATE_CLIENT_ID,
  payload: {
    clientId,
  },
});

export const updateClientSecret = (clientSecret: string): AuthActionUpdateClientSecret => ({
  type: AuthActionType.UPDATE_CLIENT_SECRET,
  payload: {
    clientSecret,
  },
});
