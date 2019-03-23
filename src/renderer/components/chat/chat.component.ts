import sharedStyles from '@components/shared.styles';
import { store } from '@renderer-store';
import { customElement, html, LitElement } from 'lit-element';
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
