import { customElement } from '@components/helpers';
import sharedStyles from '@components/shared.styles';
import { html, LitElement } from '@polymer/lit-element';
import { store } from '@store';
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
