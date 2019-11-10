import 'core-js/es7/reflect';

import { connect } from '@components/helpers';
import { I18n, I18nService } from '@services/i18n.service';
import { navigate, requestLocaleUpdate } from '@store/app/app.actions';
import { Locale } from '@store/app/app.model';
import {
  clearAuthErrors,
  requestAuthentication,
} from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { container } from '@helpers/di.helper';

import styles from './shell.styles';
import template from './shell.template';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  public static styles = styles;

  protected render = template;

  @property({ type: String })
  protected _page = 'chat';

  private _i18nService: I18n = container.get(I18nService);

  public constructor() {
    super();
    store.dispatch(requestAuthentication());
    this._setupLocale();
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

  private async _setupLocale() {
    const locale =
      (await this._i18nService.getCurrentLocale()) ||
      I18nService.supportedLocales.find(l => l === navigator.language) ||
      Locale.EN_US;
    store.dispatch(requestLocaleUpdate(locale));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}
