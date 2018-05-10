import {LitElement} from '@polymer/lit-element';

import template from './chat.template';

/**
 * The chat section of the Google Assistant Desktop,
 * where the user can actually talk with the Assistant.
 */
class GADChat extends LitElement {
  static get is() {
    return 'gad-chat';
  }

  _render(props) {
    return template(this, props);
  }
}

window.customElements.define(GADChat.is, GADChat);
