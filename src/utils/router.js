export const hashToLocation = (hash) => {
  if (!hash || !hash.length) {
    return '/';
  }
  return window.decodeURIComponent(hash.substr(1));
};

export const installRouter = (locationUpdatedCallback) => {
  window.addEventListener('hashchange', () =>
    locationUpdatedCallback(hashToLocation(window.location.hash)));
  locationUpdatedCallback(hashToLocation(window.location.hash));
};
