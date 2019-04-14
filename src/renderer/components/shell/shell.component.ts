import 'core-js/es7/reflect';

import { container } from '@helpers/di.helper';
import { L10n, L10nService } from '@services/l10n.service';
import { navigate, requestLocaleUpdate } from '@store/app/app.actions';
import { Locale } from '@store/app/app.model';
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
    const userLocale = navigator.language.slice(0, 2);
    const locale = L10nService.supportedLocales.find((l) => l === userLocale) || Locale.EN;
    store.dispatch(requestLocaleUpdate(locale));
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
