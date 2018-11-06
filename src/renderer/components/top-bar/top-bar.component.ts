import { updateMenuState } from '@actions/app';
import sharedStyles from '@components/shared.styles';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect } from 'pwa-helpers';
import styles from './top-bar.styles';

class TopBar extends connect(store)(LitElement) {
  @property({type: Boolean})
  private _menuOpened = false;

  public stateChanged(state: RootState) {
    this._menuOpened = state.app.menuOpened;
  }

  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
      <img src="assets/google-assistant-logo.svg">
      <div class="heading">
        google_logo
        <span class="ad">Assistant Desktop</span>
        <span class="unofficial">Unofficial</span>
      </div>
      <div class="spacer"></div>
      <div class="material-icons-extended" @click="${this._menuButtonClicked}">more_vert</div>
      <div class="menu" role="menu" ?hidden="${!this._menuOpened}">The menu!</div>
    `;
  }

  protected updated(changedProps: PropertyValues) {}

  private _menuButtonClicked() {
    store.dispatch(updateMenuState(!this._menuOpened));
  }
}

window.customElements.define('gad-top-bar', TopBar);
