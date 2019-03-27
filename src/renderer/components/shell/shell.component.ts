import { navigate } from '@store/app/app.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
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
