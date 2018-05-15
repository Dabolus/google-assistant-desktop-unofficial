import {
  UPDATE_PAGE, UPDATE_OFFLINE, UPDATE_HEADER_TITLE_KEY, UPDATE_HEADER_TITLE_EXTRA_KEY, UPDATE_DRAWER_STATE,
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
    case UPDATE_HEADER_TITLE_KEY:
      return {
        ...state,
        titleKey: action.titleKey,
      };
    case UPDATE_HEADER_TITLE_EXTRA_KEY:
      return {
        ...state,
        titleExtraKey: action.titleExtraKey,
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
