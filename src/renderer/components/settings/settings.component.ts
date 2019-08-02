import { connect, localize } from '@components/helpers';
import { Locale } from '@store/app/app.model';
import { requestModalOpening } from '@store/app/app.actions';
import { requestLogout } from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { container } from '@helpers/di.helper';
import { I18nService } from '@services/i18n.service';

import sharedStyles from '@components/shared.styles';
import styles from './settings.styles';
import template from './settings.template';

@customElement('gad-settings')
export class Settings extends localize(container.get(I18nService))(
  connect(store)(LitElement),
) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: String })
  protected _locale: Locale = Locale.EN_US;

  @property({ type: Object })
  protected _optionsMap: {
    [key: string]: {
      icon: string;
      external?: boolean;
    };
  } = {
    donate: {
      icon: 'credit_card',
      external: true,
    },
    metrics: {
      icon: 'finance',
      external: true,
    },
    logout: {
      icon: 'logout',
    },
  };

  public stateChanged({ app }: RootState) {
    this._locale = app.locale;
  }

  protected _optionClicked(option: string) {
    return () => {
      switch (option) {
        case 'donate':
          return store.dispatch(
            requestModalOpening('https://www.paypal.me/GiorgioGarasto'),
          );
        case 'metrics':
          return store.dispatch(
            requestModalOpening(
              'https://console.cloud.google.com/apis/api/embeddedassistant.googleapis.com/metrics',
            ),
          );
        case 'logout':
          return store.dispatch(requestLogout());
      }
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-settings': Settings;
  }
}
