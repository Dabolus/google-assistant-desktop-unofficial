import sharedStyles from '@components/shared.styles';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './bottom-bar.styles';

export class BottomBar extends connect(store)(LitElement) {
  public stateChanged(state: RootState) {}

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

  protected updated(changedProps: PropertyValues) {}
}

window.customElements.define('gad-bottom-bar', BottomBar);
