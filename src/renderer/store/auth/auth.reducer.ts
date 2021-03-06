import { Reducer } from 'redux';
import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  clientId: '',
  clientSecret: '',
  userPicture: '',
  userName: '',
  userSurname: '',
  userDisplayName: '',
  authenticated: false,
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
        userPicture: action.payload.userInfo.picture,
        userName: action.payload.userInfo.name,
        userSurname: action.payload.userInfo.surname,
        userDisplayName: action.payload.userInfo.displayName,
      };
    case AuthActionType.AUTHENTICATE_REJECTED:
      return {
        ...state,
        error: action.payload,
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
        userPicture: '',
        userName: '',
        userSurname: '',
        userDisplayName: '',
        authenticated: false,
      };
    case AuthActionType.LOGOUT_REJECTED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
