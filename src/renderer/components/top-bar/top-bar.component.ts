import sharedStyles from '@components/shared.styles';
import { updateMenuState } from '@gadu/store/lib/app/app.actions';
import { RootState } from '@gadu/store/lib/root/root.model';
import { store } from '@renderer-store';
import { customElement, html, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import styles from './top-bar.styles';

@customElement('gad-top-bar')
export class TopBar extends connect(store)(LitElement) {
  @property({ type: Boolean })
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

  private _menuButtonClicked() {
    store.dispatch(updateMenuState(!this._menuOpened));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-top-bar': TopBar;
  }
}
