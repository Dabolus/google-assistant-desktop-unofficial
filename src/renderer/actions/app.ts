import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';

export enum AppActionType {
  UPDATE_PAGE = 'UPDATE_PAGE',
}

export interface AppActionUpdatePage extends Action<AppActionType.UPDATE_PAGE> {
  page: string;
}
export type AppAction = AppActionUpdatePage;

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
