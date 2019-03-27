import { Reducer } from 'redux';
import { ChatAction, ChatActionType } from './chat.actions';
import { ChatState } from './chat.model';

const initialState: ChatState = {
  text: '',
};

export const chatReducer: Reducer<ChatState, ChatAction> = (
  state: ChatState = initialState,
  action,
) => {
  switch (action.type) {
    case ChatActionType.UPDATE_INPUT:
      return {
        ...state,
        text: action.payload.text,
      };
    default:
      return state;
  }
};
