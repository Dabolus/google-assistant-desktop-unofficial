import { Reducer } from 'redux';
import { ChatAction, ChatActionType } from './chat.actions';
import { ChatState } from './chat.model';

export const initialState: ChatState = {
  text: '',
  chatError: null,
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
    case ChatActionType.SEND_MESSAGE_REJECTED:
      return {
        ...state,
        chatError: action.payload.error,
      };
    default:
      return state;
  }
};
