import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';

export enum AppActionType {
  UPDATE_PAGE = 'UPDATE_PAGE',
  UPDATE_MENU_STATE = 'UPDATE_MENU_STATE',
}

export interface AppActionUpdatePage extends Action<AppActionType.UPDATE_PAGE> {
  page: string;
}

export interface AppActionUpdateMenuState extends Action<AppActionType.UPDATE_MENU_STATE> {
  opened: boolean;
}

export type AppAction = AppActionUpdatePage | AppActionUpdateMenuState;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
  const page = path === '/' ? 'view1' : path.slice(1);
  dispatch(loadPage(page));
};

const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
  switch (page) {
  }
  dispatch(updatePage(page));
};

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    page,
    type: AppActionType.UPDATE_PAGE,
  };
};

export const updateMenuState: ActionCreator<AppActionUpdateMenuState> = (opened: boolean) => {
  return {
    opened,
    type: AppActionType.UPDATE_MENU_STATE,
  };
};
