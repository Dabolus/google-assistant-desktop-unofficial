import { Reducer } from 'redux';
import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  clientId: '',
  clientSecret: '',
  // We make the user authenticated by default to avoid flashing the wizard
  // at each app opening. Of course, as soon as we detect that the user isn't
  // actually authenticated, this value will be set to false and the wizard
  // will be shown.
  authenticated: true,
  error: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialState,
  action,
) => {
  switch (action.type) {
    case AuthActionType.UPDATE_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload.clientId,
      };
    case AuthActionType.UPDATE_CLIENT_SECRET:
      return {
        ...state,
        clientSecret: action.payload.clientSecret,
      };
    case AuthActionType.AUTHENTICATE_RESOLVED:
      return {
        ...state,
        authenticated: true,
      };
    case AuthActionType.AUTHENTICATE_REJECTED:
      return {
        ...state,
        error: action.payload.error,
      };
    case AuthActionType.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
      };
    case AuthActionType.LOGOUT_RESOLVED:
      return {
        ...state,
        clientId: '',
        clientSecret: '',
        authenticated: false,
      };
    case AuthActionType.LOGOUT_REJECTED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
