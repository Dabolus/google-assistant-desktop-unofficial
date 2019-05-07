import { connect } from '@components/helpers';
import { LocaleData } from '@locales/model';
import { navigate } from '@store/app/app.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './top-bar.styles';
import template from './top-bar.template';

@customElement('gad-top-bar')
export class TopBar extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: String })
  protected _page = 'chat';

  @property({ type: String })
  protected _localeData: LocaleData = null;

  public stateChanged({ app }: RootState) {
    this._page = app.page;
    this._localeData = app.localeData;
  }

  protected _backButtonClicked() {
    store.dispatch(navigate('chat'));
  }

  protected _settingsButtonClicked() {
    store.dispatch(navigate('settings'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-top-bar': TopBar;
  }
}
