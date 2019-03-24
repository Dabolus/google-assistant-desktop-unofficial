import '@components/bottom-bar/bottom-bar.component';
import '@components/chat/chat.component';
import '@components/top-bar/top-bar.component';
import { navigate } from '@gadu/store/lib/app/app.actions';
import { RootState } from '@gadu/store/lib/root/root.model';
import { store } from '@renderer-store';
import { customElement, LitElement, property } from 'lit-element';
import { connect, installRouter } from 'pwa-helpers';

import styles from './shell.styles';
import template from './shell.template';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  public static styles = styles;

  @property({ type: String })
  protected _page = '';

  public stateChanged(state: RootState) {
    this._page = state.app.page;
  }

  protected render() {
    return template.call(this);
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
