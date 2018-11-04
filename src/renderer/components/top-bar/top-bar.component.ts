import sharedStyles from '@components/shared.styles';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './top-bar.styles';

class TopBar extends connect(store)(LitElement) {
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
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Google_Assistant_logo.svg">
      <div class="heading">
        google_logo
        <span class="ad">Assistant Desktop</span>
        <span class="unofficial">Unofficial</span>
      </div>
      <div class="spacer"></div>
      <div class="material-icons-extended">more_vert</div>
    `;
  }

  protected updated(changedProps: PropertyValues) {}
}

window.customElements.define('gad-top-bar', TopBar);
