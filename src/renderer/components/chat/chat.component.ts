import { customElement } from '@components/helpers';
import sharedStyles from '@components/shared.styles';
import { html, LitElement } from '@polymer/lit-element';
import { store } from '@renderer-store';
import { connect } from 'pwa-helpers';
import styles from './chat.styles';

@customElement('gad-chat')
export class Chat extends connect(store)(LitElement) {
  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}
