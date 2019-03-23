import sharedStyles from '@components/shared.styles';
import { store } from '@renderer-store';
import { customElement, html, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import styles from './bottom-bar.styles';

@customElement('gad-bottom-bar')
export class BottomBar extends connect(store)(LitElement) {
  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
      <input type="text" placeholder="Type a message" autofocus>
      <div>
        <img src="assets/google-mic.svg">
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-bottom-bar': BottomBar;
  }
}
