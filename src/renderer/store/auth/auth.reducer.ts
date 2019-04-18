import { Reducer } from 'redux';
import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  clientId: '',
  clientSecret: '',
  authError: null,
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
    case AuthActionType.AUTHENTICATE_REJECTED:
      return {
        ...state,
        authError: action.payload.error,
      };
    case AuthActionType.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};
