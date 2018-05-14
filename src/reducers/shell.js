import {
  UPDATE_PAGE, UPDATE_OFFLINE, UPDATE_DRAWER_STATE,
} from '../actions/shell';

const shell = (state = { drawerOpened: false }, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline,
      };
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened,
      };
    default:
      return state;
  }
};

export default shell;
