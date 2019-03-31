import { Reducer } from 'redux';
import { AuthAction, AuthActionType } from './auth.actions';
import { AuthState } from './auth.model';

export const initialState: AuthState = {
  clientId: '',
  clientSecret: '',
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState = initialState,
  action,
) => {
  switch (action.type) {
    case AuthActionType.UPDATE_CLIENT_ID:
      return {
        ...state,
        text: action.payload.clientId,
      };
    case AuthActionType.UPDATE_CLIENT_SECRET:
      return {
        ...state,
        text: action.payload.clientSecret,
      };
    default:
      return state;
  }
};
