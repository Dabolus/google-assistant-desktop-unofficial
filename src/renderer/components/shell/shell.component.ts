import 'core-js/proposals/reflect-metadata';

import { connect } from '@components/helpers';
import { I18nService } from '@services/i18n.service';
import { navigate, requestLocaleUpdate } from '@store/app/app.actions';
import { Locale } from '@store/app/app.model';
import {
  clearAuthErrors,
  requestAuthentication,
} from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';

import styles from './shell.styles';
import template from './shell.template';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  public static styles = styles;

  protected render = template;

  @property({ type: String })
  protected _page = 'chat';

  public constructor() {
    super();
    const userLocale = navigator.language.slice(0, 2);
    const locale =
      I18nService.supportedLocales.find(l => l === userLocale) || Locale.EN;
    store.dispatch(requestAuthentication());
    store.dispatch(requestLocaleUpdate(locale));
  }

  public stateChanged({ app, auth }: RootState) {
    this._page = app.page;
    this.setAttribute('theme', app.theme);
    if (auth.authenticated && this._page === 'wizard') {
      store.dispatch(navigate('chat'));
    }
    if (!auth.authenticated && this._page !== 'wizard') {
      store.dispatch(navigate('wizard'));
    }
    if (auth.error) {
      store.dispatch(clearAuthErrors());
      store.dispatch(navigate('wizard'));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}
