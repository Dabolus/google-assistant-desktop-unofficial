import { Reducer } from 'redux';
import { AppAction, AppActionType } from './app.actions';
import { AppState, Locale } from './app.model';
import defaultLocaleData from '@locales/en.locale';

export const initialState: AppState = {
  page: 'chat',
  locale: Locale.EN,
  localeData: defaultLocaleData,
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
        localeData: action.payload.localeData,
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
