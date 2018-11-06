import sharedStyles from '@components/shared.styles';
import { html, LitElement, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './chat.styles';

export class Chat extends connect(store)(LitElement) {
  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
    `;
  }
}

window.customElements.define('gad-chat', Chat);
