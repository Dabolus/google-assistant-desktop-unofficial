export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'chat' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page) => async (dispatch) => {
  switch (page) {
    case 'chat':
      await import('../components/chat/chat.component');
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    /* case 'view2':
      await import('../components/my-view2.js');
      break;
    case 'view3':
      await import('../components/my-view3.js');
      break;
    default:
      page = 'view404';
      await import('../components/my-view404.js');*/
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page,
  };
};

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR,
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().shell.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline,
  });
};

export const updateLayout = () => (dispatch, getState) => {
  if (getState().shell.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().shell.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened,
    });
  }
};
