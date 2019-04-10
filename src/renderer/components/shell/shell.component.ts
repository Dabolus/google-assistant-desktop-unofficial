import 'core-js/es7/reflect';

import { navigate } from '@store/app/app.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import styles from './shell.styles';
import template from './shell.template';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  public static styles = styles;

  @property({ type: String })
  protected _page = 'chat';

  constructor() {
    super();
    store.dispatch(navigate('wizard'));
  }

  public stateChanged({ app }: RootState) {
    this._page = app.page;
  }

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}
