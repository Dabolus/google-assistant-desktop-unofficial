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
export type AppActionUpdatePage = FluxStandardAction<
  AppActionType.UPDATE_PAGE,
  {
    page: string;
  }
>;

export type AppActionUpdateLocaleRequested = FluxStandardAction<
  AppActionType.UPDATE_LOCALE_REQUESTED,
  {
    locale: Locale;
  }
>;

export type AppActionUpdateLocaleResolved = FluxStandardAction<
  AppActionType.UPDATE_LOCALE_RESOLVED,
  {
    locale: Locale;
  }
>;

export type AppActionUpdateLocaleRejected = FluxStandardAction<
  AppActionType.UPDATE_LOCALE_REJECTED,
  Error
>;

export type AppActionSetTheme = FluxStandardAction<
  AppActionType.SET_THEME,
  {
    theme: string;
  }
>;

export type AppActionOpenModalRequested = FluxStandardAction<
  AppActionType.OPEN_MODAL_REQUESTED,
  {
    ref: string;
  }
>;

export type AppActionOpenModalResolved = FluxStandardAction<
  AppActionType.OPEN_MODAL_RESOLVED,
  {
    result: any;
  }
>;

export type AppActionOpenModalRejected = FluxStandardAction<
  AppActionType.OPEN_MODAL_REJECTED,
  Error
>;

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

export const requestLocaleUpdate = (
  locale: Locale,
): AppActionUpdateLocaleRequested => ({
  type: AppActionType.UPDATE_LOCALE_REQUESTED,
  payload: {
    locale,
  },
});

export const resolveLocaleUpdate = (
  locale: Locale,
): AppActionUpdateLocaleResolved => ({
  type: AppActionType.UPDATE_LOCALE_RESOLVED,
  payload: {
    locale,
  },
});

export const rejectLocaleUpdate = (
  error: Error,
): AppActionUpdateLocaleRejected => ({
  type: AppActionType.UPDATE_LOCALE_REJECTED,
  error: true,
  payload: error,
});

export const setTheme = (theme: string): AppActionSetTheme => ({
  type: AppActionType.SET_THEME,
  payload: {
    theme,
  },
});

export const requestModalOpening = (
  ref: string,
): AppActionOpenModalRequested => ({
  type: AppActionType.OPEN_MODAL_REQUESTED,
  payload: {
    ref,
  },
});

export const resolveModalOpening = (
  result: any,
): AppActionOpenModalResolved => ({
  type: AppActionType.OPEN_MODAL_RESOLVED,
  payload: {
    result,
  },
});

export const rejectModalOpening = (
  error: Error,
): AppActionOpenModalRejected => ({
  type: AppActionType.OPEN_MODAL_REJECTED,
  error: true,
  payload: error,
});
