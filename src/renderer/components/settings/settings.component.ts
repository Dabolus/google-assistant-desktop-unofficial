import { connect } from '@components/helpers';
import { LocaleData, LocaleDataSettings } from '@locales/model';
import { requestModalOpening } from '@store/app/app.actions';
import { requestLogout } from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './settings.styles';
import template from './settings.template';

@customElement('gad-settings')
export class Settings extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: String })
  protected _localeData: LocaleData = null;

  @property({ type: Object })
  protected _optionsMap: {
    [key in keyof LocaleDataSettings]: {
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
    this._localeData = app.localeData;
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
            requestModalOpening('https://console.cloud.google.com/apis/api/embeddedassistant.googleapis.com/metrics'),
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
