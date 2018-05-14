import { LocalizedLitElement } from '@dabolus/localized-lit-element';

import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

// import './snack-bar';

import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { updateMetadata } from 'pwa-helpers/metadata';

import { store } from '../../store';
import { navigate, updateOffline, updateLayout } from '../../actions/shell';

import template from './shell.template';

/**
 * The shell of the Google Assistant Desktop,
 */
class GADShell extends connect(store)(LocalizedLitElement) {
  static get is() {
    return 'gad-shell';
  }

  _render(props) {
    return template(this, props);
  }


  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean,
    };
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
      (matches) => store.dispatch(updateLayout(matches)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle,
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.shell.page;
    this._offline = state.shell.offline;
    this._snackbarOpened = state.shell.snackbarOpened;
    this._drawerOpened = state.shell.drawerOpened;
  }
}

window.customElements.define(GADShell.is, GADShell);
