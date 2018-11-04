import sharedStyles from '@components/shared.styles';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './chat.styles';

class Chat extends connect(store)(LitElement) {
  @property({type: String})
  public appTitle = '';

  @property({type: String})
  private _page = '';

  public stateChanged(state: RootState) {
    this._page = state.app.page;
  }

  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
    `;
  }

  protected updated(changedProps: PropertyValues) {}
}

window.customElements.define('gad-chat', Chat);
