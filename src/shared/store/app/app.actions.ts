import { ActionCreator } from 'redux';
import { FluxStandardAction } from '../store.model';

// Action types
export enum AppActionType {
  UPDATE_MENU_STATE = 'UPDATE_MENU_STATE',
}

// Action interfaces
export interface AppActionUpdateMenuState extends
  FluxStandardAction<AppActionType.UPDATE_MENU_STATE> {
  payload: {
    opened: boolean;
  };
}

export type AppAction = AppActionUpdateMenuState;

// Actions
export const updateMenuState: ActionCreator<AppActionUpdateMenuState> = (opened: boolean) => ({
  type: AppActionType.UPDATE_MENU_STATE,
  payload: {
    opened,
  },
});
