import 'core-js/proposals/reflect-metadata';

import { connect } from '@components/helpers';
import { L10nService } from '@services/l10n.service';
import { navigate, requestLocaleUpdate, setTheme } from '@store/app/app.actions';
import { Locale } from '@store/app/app.model';
import { clearAuthErrors, requestAuthentication, requestLogout } from '@store/auth/auth.actions';
import { receiveMessage } from '@store/chat/chat.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { ipcRenderer } from 'electron';
import { customElement, LitElement, property } from 'lit-element';

import styles from './shell.styles';
import template from './shell.template';

@customElement('gad-shell')
export class Shell extends connect(store)(LitElement) {
  public static styles = styles;

  @property({ type: String })
  protected _page = 'chat';

  constructor() {
    super();
    const userLocale = navigator.language.slice(0, 2);
    const locale = L10nService.supportedLocales.find((l) => l === userLocale) || Locale.EN;
    store.dispatch(requestAuthentication());
    store.dispatch(requestLocaleUpdate(locale));
    this._setupEventListeners();
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

  protected render() {
    return template.call(this);
  }

  private _setupEventListeners() {
    ipcRenderer.on('app.setTheme', (_: Event, theme: string) => {
      store.dispatch(setTheme(theme));
    });
    ipcRenderer.on('chat.receiveMessage', (_: Event, text: string) => {
      store.dispatch(receiveMessage(text));
    });
    ipcRenderer.on('auth.requestLogout', () => {
      store.dispatch(requestLogout());
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}
