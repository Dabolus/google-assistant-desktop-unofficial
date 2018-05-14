import { LocalizedLitElement } from '@dabolus/localized-lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';

import { connect } from 'pwa-helpers/connect-mixin';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { installRouter } from '../../utils/router';

import { store } from '../../store';
import { navigate, updateOffline } from '../../actions/shell';

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
      _page: String,
      _drawerOpened: Boolean,
      _offline: Boolean,
    };
  }

  constructor() {
    super();
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(location)));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  _stateChanged(state) {
    this._page = state.shell.page;
    this._offline = state.shell.offline;
    this._drawerOpened = state.shell.drawerOpened;
  }
}

window.customElements.define(GADShell.is, GADShell);
