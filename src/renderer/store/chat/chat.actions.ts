import { ActionCreator } from 'redux';
import { FluxStandardAction } from '../store.model';

// Action types
export enum ChatActionType {
  UPDATE_INPUT = 'UPDATE_INPUT',
}

// Action interfaces
export interface ChatActionUpdateInput extends
  FluxStandardAction<ChatActionType.UPDATE_INPUT> {
  payload: {
    text: string;
  };
}

export type ChatAction = ChatActionUpdateInput;

// Actions
export const updateInput: ActionCreator<ChatActionUpdateInput> = (text: string) => ({
  type: ChatActionType.UPDATE_INPUT,
  payload: {
    text,
  },
});
