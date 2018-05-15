export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_HEADER_TITLE_KEY = 'UPDATE_HEADER_TITLE_KEY';
export const UPDATE_HEADER_TITLE_EXTRA_KEY = 'UPDATE_HEADER_TITLE_EXTRA_KEY';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'chat' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  dispatch(updateHeaderTitleKey(page));
  dispatch(updateHeaderTitleExtraKey(page));

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

const updateHeaderTitleKey = (page) => ({
  type: UPDATE_HEADER_TITLE_KEY,
  titleKey: `${page}-title`,
});

const updateHeaderTitleExtraKey = (page) => ({
  type: UPDATE_HEADER_TITLE_EXTRA_KEY,
  titleExtraKey: `${page}-title-extra`,
});

const updatePage = (page) => ({
  type: UPDATE_PAGE,
  page,
});

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snbar, unless this is the first load of the page.
  if (getState().shell.offline !== undefined) {
    // dispatch(snBar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline,
  });
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().shell.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened,
    });
  }
};
