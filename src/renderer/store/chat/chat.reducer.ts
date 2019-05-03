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
    case ChatActionType.SEND_MESSAGE_RESOLVED:
      return {
        ...state,
        text: '',
        history: [...state.history.slice(-50), {
          type: MessageType.OUT,
          text: action.payload.text,
          timestamp: Date.now(),
        }],
      };
    case ChatActionType.SEND_MESSAGE_REJECTED:
      return {
        ...state,
        error: action.payload.error,
      };
    case ChatActionType.RECEIVE_MESSAGE:
      // TODO: handle other infos received from the Assistant (e.g. audio)
      return action.payload.content.text ? {
        ...state,
        history: [...state.history.slice(-50), {
          type: MessageType.IN,
          text: action.payload.content.text,
          timestamp: Date.now(),
        }],
      } : state;
    default:
      return state;
  }
};
