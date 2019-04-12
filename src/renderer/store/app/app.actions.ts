import { LocaleData } from '@locales/model';
import { FluxStandardAction } from '../store.model';
import { Locale } from './app.model';

// Action types
export enum AppActionType {
  UPDATE_PAGE = 'UPDATE_PAGE',
  UPDATE_MENU_STATE = 'UPDATE_MENU_STATE',

  UPDATE_LOCALE_REQUESTED = 'UPDATE_LOCALE_REQUESTED',
  UPDATE_LOCALE_RESOLVED = 'UPDATE_LOCALE_RESOLVED',
  UPDATE_LOCALE_REJECTED = 'UPDATE_LOCALE_REJECTED',
}

// Action interfaces
export interface AppActionUpdatePage extends
  FluxStandardAction<AppActionType.UPDATE_PAGE> {
  payload: {
    page: string;
  };
}

export interface AppActionUpdateMenuState extends
  FluxStandardAction<AppActionType.UPDATE_MENU_STATE> {
  payload: {
    opened: boolean;
  };
}

export interface AppActionUpdateLocaleRequested extends
  FluxStandardAction<AppActionType.UPDATE_LOCALE_REQUESTED> {
  payload: {
    locale: Locale;
  };
}

export interface AppActionUpdateLocaleResolved extends
  FluxStandardAction<AppActionType.UPDATE_LOCALE_RESOLVED> {
  payload: {
    localeData: LocaleData;
  };
}

export interface AppActionUpdateLocaleRejected extends
  FluxStandardAction<AppActionType.UPDATE_LOCALE_REJECTED> {
  payload: {
    error: Error;
  };
}

export type AppAction =
  | AppActionUpdatePage
  | AppActionUpdateMenuState
  | AppActionUpdateLocaleRequested
  | AppActionUpdateLocaleResolved
  | AppActionUpdateLocaleRejected;

// Actions
export const navigate = (page: string): AppActionUpdatePage => {
  return {
    type: AppActionType.UPDATE_PAGE,
    payload: {
      page,
    },
  };
};

export const updateMenuState = (opened: boolean): AppActionUpdateMenuState => ({
  type: AppActionType.UPDATE_MENU_STATE,
  payload: {
    opened,
  },
});

export const requestLocaleUpdate = (locale: Locale): AppActionUpdateLocaleRequested => ({
  type: AppActionType.UPDATE_LOCALE_REQUESTED,
  payload: {
    locale,
  },
});

export const resolveLocaleUpdate = (localeData: LocaleData): AppActionUpdateLocaleResolved => ({
  type: AppActionType.UPDATE_LOCALE_RESOLVED,
  payload: {
    localeData,
  },
});

export const rejectLocaleUpdate = (error: Error): AppActionUpdateLocaleRejected => ({
  type: AppActionType.UPDATE_LOCALE_REJECTED,
  payload: {
    error,
  },
});
