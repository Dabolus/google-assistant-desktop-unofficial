import { Reducer } from 'redux';
import { AppAction, AppActionType } from './app.actions';
import { AppState, Locale } from './app.model';

export const initialState: AppState = {
  page: 'chat',
  locale: Locale.EN,
  theme: location.hash.slice(1),
};

export const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = initialState,
  action,
) => {
  switch (action.type) {
    case AppActionType.UPDATE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case AppActionType.UPDATE_LOCALE_RESOLVED:
      return {
        ...state,
        locale: action.payload.locale,
      };
    case AppActionType.SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};
