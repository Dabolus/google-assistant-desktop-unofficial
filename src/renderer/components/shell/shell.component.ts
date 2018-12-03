import '@components/bottom-bar/bottom-bar.component';
import '@components/chat/chat.component';
import { customElement, property } from '@components/helpers';
import '@components/top-bar/top-bar.component';
import { html, LitElement } from '@polymer/lit-element';
import { store } from '@renderer-store';
import { navigate } from '@shared/store/app/app.actions';
import { RootState } from '@shared/store/root/root.model';
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
