import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {
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
    type: UPDATE_PAGE,
  };
};
