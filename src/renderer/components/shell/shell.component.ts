import '@components/bottom-bar/bottom-bar.component';
import '@components/chat/chat.component';
import '@components/top-bar/top-bar.component';
import { navigate } from '@gadu/store/lib/app/app.actions';
import { RootState } from '@gadu/store/lib/root/root.model';
import { store } from '@renderer-store';
import { customElement, html, LitElement, property } from 'lit-element';
import { connect, installRouter } from 'pwa-helpers';
import styles from './shell.styles';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  @property({ type: String })
  private _page = '';

  public stateChanged(state: RootState) {
    this._page = state.app.page;
  }

  protected render() {
    return html`
      ${styles}
      <gad-top-bar role="heading"></gad-top-bar>
      <gad-chat></gad-chat>
      <gad-bottom-bar></gad-bottom-bar>
    `;
  }

  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}
