import { FluxStandardAction } from '../store.model';

// Action types
export enum AuthActionType {
  UPDATE_CLIENT_ID = 'UPDATE_CLIENT_ID',

  UPDATE_CLIENT_SECRET = 'UPDATE_CLIENT_SECRET',

  AUTHENTICATE_REQUESTED = 'AUTHENTICATE_REQUESTED',
  AUTHENTICATE_RESOLVED = 'AUTHENTICATE_RESOLVED',
  AUTHENTICATE_REJECTED = 'AUTHENTICATE_REJECTED',

  CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS',

  LOGOUT_REQUESTED = 'LOGOUT_REQUESTED',
  LOGOUT_RESOLVED = 'LOGOUT_RESOLVED',
  LOGOUT_REJECTED = 'LOGOUT_REJECTED',
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

export interface AuthActionAuthenticateRequested extends
  FluxStandardAction<AuthActionType.AUTHENTICATE_REQUESTED> {
  payload: {
    clientId?: string;
    clientSecret?: string;
  };
}

export interface AuthActionAuthenticateResolved extends
  FluxStandardAction<AuthActionType.AUTHENTICATE_RESOLVED> {}

export interface AuthActionAuthenticateRejected extends
  FluxStandardAction<AuthActionType.AUTHENTICATE_REJECTED> {
  payload: {
    error: Error;
  };
}

export interface AuthActionClearAuthErrors extends
  FluxStandardAction<AuthActionType.CLEAR_AUTH_ERRORS> {}

export interface AuthActionLogoutRequested extends
  FluxStandardAction<AuthActionType.LOGOUT_REQUESTED> {}

export interface AuthActionLogoutResolved extends
  FluxStandardAction<AuthActionType.LOGOUT_RESOLVED> {}

export interface AuthActionLogoutRejected extends
  FluxStandardAction<AuthActionType.LOGOUT_REJECTED> {
  payload: {
    error: Error;
  };
}

export type AuthAction =
  | AuthActionUpdateClientId
  | AuthActionUpdateClientSecret
  | AuthActionAuthenticateRequested
  | AuthActionAuthenticateResolved
  | AuthActionAuthenticateRejected
  | AuthActionClearAuthErrors
  | AuthActionLogoutRequested
  | AuthActionLogoutResolved
  | AuthActionLogoutRejected;

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

export const requestAuthentication = (
  clientId?: string,
  clientSecret?: string,
): AuthActionAuthenticateRequested => ({
  type: AuthActionType.AUTHENTICATE_REQUESTED,
  payload: {
    clientId,
    clientSecret,
  },
});

export const resolveAuthentication = (): AuthActionAuthenticateResolved => ({
  type: AuthActionType.AUTHENTICATE_RESOLVED,
});

export const rejectAuthentication = (error: Error): AuthActionAuthenticateRejected => ({
  type: AuthActionType.AUTHENTICATE_REJECTED,
  payload: {
    error,
  },
});

export const clearAuthErrors = (): AuthActionClearAuthErrors => ({
  type: AuthActionType.CLEAR_AUTH_ERRORS,
});

export const requestLogout = (): AuthActionLogoutRequested => ({
  type: AuthActionType.LOGOUT_REQUESTED,
});

export const resolveLogout = (): AuthActionLogoutResolved => ({
  type: AuthActionType.LOGOUT_RESOLVED,
});

export const rejectLogout = (error: Error): AuthActionLogoutRejected => ({
  type: AuthActionType.LOGOUT_REJECTED,
  payload: {
    error,
  },
});
