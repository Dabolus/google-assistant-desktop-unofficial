import { connect, localize } from '@components/helpers';
import { Locale } from '@store/app/app.model';
import { navigate } from '@store/app/app.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { container } from '@helpers/di.helper';
import { I18nService } from '@services/i18n.service';

import sharedStyles from '@components/shared.styles';
import styles from './top-bar.styles';
import template from './top-bar.template';

@customElement('gad-top-bar')
export class TopBar extends localize(container.get(I18nService))(
  connect(store)(LitElement),
) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: String })
  protected _page = 'chat';

  @property({ type: String })
  protected _locale: Locale = Locale.EN_US;

  public stateChanged({ app }: RootState) {
    this._page = app.page;
    this._locale = app.locale;
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
