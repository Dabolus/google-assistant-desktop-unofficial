import { LocalizedLitElement } from '@dabolus/localized-lit-element';

import { connect } from 'pwa-helpers/connect-mixin';

import { store } from '../../store';

import template from './chat.template';

/**
 * The chat section of the Google Assistant Desktop,
 * where the user can actually talk with the Assistant.
 */
class GADChat extends connect(store)(LocalizedLitElement) {
  static get is() {
    return 'gad-chat';
  }

  _render(props) {
    return template(this, props);
  }


  static get properties() {
    return {
      _offline: Boolean,
    };
  }

  _stateChanged(state) {
    this._offline = state.shell.offline;
  }
}

window.customElements.define(GADChat.is, GADChat);
