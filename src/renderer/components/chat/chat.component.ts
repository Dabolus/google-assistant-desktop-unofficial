import sharedStyles from '@components/shared.styles';
import { html, LitElement, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './chat.styles';

export class Chat extends connect(store)(LitElement) {
  public stateChanged(state: RootState) {}

  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
    `;
  }

  protected updated(changedProps: PropertyValues) {}
}

window.customElements.define('gad-chat', Chat);
