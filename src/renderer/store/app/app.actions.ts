import { ActionCreator } from 'redux';
import { FluxStandardAction } from '../store.model';

// Action types
export enum AppActionType {
  UPDATE_PAGE = 'UPDATE_PAGE',
  UPDATE_MENU_STATE = 'UPDATE_MENU_STATE',
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

export type AppAction = AppActionUpdatePage | AppActionUpdateMenuState;

// Actions
export const navigate: ActionCreator<AppActionUpdatePage> = (path: string) => {
  const page = path === '/' ? 'home' : path.slice(1);
  return {
    type: AppActionType.UPDATE_PAGE,
    payload: {
      page,
    },
  };
};

export const updateMenuState: ActionCreator<AppActionUpdateMenuState> = (opened: boolean) => ({
  type: AppActionType.UPDATE_MENU_STATE,
  payload: {
    opened,
  },
});
