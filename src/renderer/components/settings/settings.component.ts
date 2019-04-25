import { LocaleData } from '@locales/model';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './settings.styles';
import template from './settings.template';

@customElement('gad-settings')
export class Settings extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  @property({ type: String })
  protected _localeData: LocaleData = null;

  @property({ type: Object })
  protected _optionsMap = {
    logout: 'logout',
  };

  public stateChanged({ app }: RootState) {
    this._localeData = app.localeData;
  }

  protected render() {
    return template.call(this);
  }

  protected _optionClicked(option: string) {
    return () => {
      switch (option) {
        case 'logout':
          console.log('Logout!');
      }
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-settings': Settings;
  }
}
