import { Reducer } from 'redux';
import { ChatAction, ChatActionType } from './chat.actions';
import { ChatState, MessageType } from './chat.model';

export const initialState: ChatState = {
  text: '',
  error: null,
  history: [],
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
        error: action.payload.error,
      };
    case ChatActionType.RECEIVE_MESSAGE:
      return {
        ...state,
        history: [...state.history.slice(-50), {
          type: MessageType.IN,
          content: action.payload.text,
        }],
      };
    default:
      return state;
  }
};
