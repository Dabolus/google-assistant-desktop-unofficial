import { LocaleData } from '@locales/model';
import { FluxStandardAction } from '../store.model';
import { Locale } from './app.model';

// Action types
export enum AppActionType {
  UPDATE_PAGE = 'UPDATE_PAGE',

  UPDATE_LOCALE_REQUESTED = 'UPDATE_LOCALE_REQUESTED',
  UPDATE_LOCALE_RESOLVED = 'UPDATE_LOCALE_RESOLVED',
  UPDATE_LOCALE_REJECTED = 'UPDATE_LOCALE_REJECTED',

  SET_THEME = 'SET_THEME',

  OPEN_MODAL_REQUESTED = 'OPEN_MODAL_REQUESTED',
  OPEN_MODAL_RESOLVED = 'OPEN_MODAL_RESOLVED',
  OPEN_MODAL_REJECTED = 'OPEN_MODAL_REJECTED',
}

// Action interfaces
export interface AppActionUpdatePage extends
  FluxStandardAction<AppActionType.UPDATE_PAGE> {
  payload: {
    page: string;
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

export interface AppActionSetTheme extends
  FluxStandardAction<AppActionType.SET_THEME> {
  payload: {
    theme: string;
  };
}

export interface AppActionOpenModalRequested extends
  FluxStandardAction<AppActionType.OPEN_MODAL_REQUESTED> {
  payload: {
    ref: string;
  };
}

export interface AppActionOpenModalResolved extends
  FluxStandardAction<AppActionType.OPEN_MODAL_RESOLVED> {
  payload: {
    result: any;
  };
}

export interface AppActionOpenModalRejected extends
  FluxStandardAction<AppActionType.OPEN_MODAL_REJECTED> {
  payload: {
    error: Error;
  };
}

export type AppAction =
  | AppActionUpdatePage
  | AppActionUpdateLocaleRequested
  | AppActionUpdateLocaleResolved
  | AppActionUpdateLocaleRejected
  | AppActionSetTheme
  | AppActionOpenModalRequested
  | AppActionOpenModalResolved
  | AppActionOpenModalRejected;

// Actions
export const navigate = (page: string): AppActionUpdatePage => {
  return {
    type: AppActionType.UPDATE_PAGE,
    payload: {
      page,
    },
  };
};

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

export const setTheme = (theme: string): AppActionSetTheme => ({
  type: AppActionType.SET_THEME,
  payload: {
    theme,
  },
});

export const requestModalOpening = (ref: string): AppActionOpenModalRequested => ({
  type: AppActionType.OPEN_MODAL_REQUESTED,
  payload: {
    ref,
  },
});

export const resolveModalOpening = (result: any): AppActionOpenModalResolved => ({
  type: AppActionType.OPEN_MODAL_RESOLVED,
  payload: {
    result,
  },
});

export const rejectModalOpening = (error: Error): AppActionOpenModalRejected => ({
  type: AppActionType.OPEN_MODAL_REJECTED,
  payload: {
    error,
  },
});
