import { FluxStandardAction } from '../store.model';
import { UserInfo } from './auth.model';

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
export type AuthActionUpdateClientId = FluxStandardAction<
  AuthActionType.UPDATE_CLIENT_ID,
  {
    clientId: string;
  }
>;

export type AuthActionUpdateClientSecret = FluxStandardAction<
  AuthActionType.UPDATE_CLIENT_SECRET,
  {
    clientSecret: string;
  }
>;

export type AuthActionAuthenticateRequested = FluxStandardAction<
  AuthActionType.AUTHENTICATE_REQUESTED,
  {
    clientId?: string;
    clientSecret?: string;
  }
>;

export type AuthActionAuthenticateResolved = FluxStandardAction<
  AuthActionType.AUTHENTICATE_RESOLVED,
  {
    userInfo: UserInfo;
  }
>;

export type AuthActionAuthenticateRejected = FluxStandardAction<
  AuthActionType.AUTHENTICATE_REJECTED,
  Error
>;

export type AuthActionClearAuthErrors = FluxStandardAction<
  AuthActionType.CLEAR_AUTH_ERRORS
>;

export type AuthActionLogoutRequested = FluxStandardAction<
  AuthActionType.LOGOUT_REQUESTED
>;

export type AuthActionLogoutResolved = FluxStandardAction<
  AuthActionType.LOGOUT_RESOLVED
>;

export type AuthActionLogoutRejected = FluxStandardAction<
  AuthActionType.LOGOUT_REJECTED,
  Error
>;

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

export const updateClientSecret = (
  clientSecret: string,
): AuthActionUpdateClientSecret => ({
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

export const resolveAuthentication = (
  userInfo: UserInfo,
): AuthActionAuthenticateResolved => ({
  type: AuthActionType.AUTHENTICATE_RESOLVED,
  payload: { userInfo },
});

export const rejectAuthentication = (
  error: Error,
): AuthActionAuthenticateRejected => ({
  type: AuthActionType.AUTHENTICATE_REJECTED,
  error: true,
  payload: error,
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
  error: true,
  payload: error,
});
