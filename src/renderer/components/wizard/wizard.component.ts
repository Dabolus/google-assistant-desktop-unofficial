import { connect } from '@components/helpers';
import { LocaleData } from '@locales/model';
import { requestLocaleUpdate } from '@store/app/app.actions';
import { Locale } from '@store/app/app.model';
import {
  requestAuthentication,
  updateClientId,
  updateClientSecret,
} from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { updateStep } from '@store/wizard/wizard.actions';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './wizard.styles';
import template from './wizard.template';

@customElement('gad-wizard')
export class Wizard extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: Number })
  protected _currentStep = 0;

  @property({ type: String })
  protected _clientId = '';

  @property({ type: String })
  protected _clientSecret = '';

  @property({ type: Boolean })
  protected _clientIdValid = false;

  @property({ type: Boolean })
  protected _clientSecretValid = false;

  @property({ type: String })
  protected _localeData: LocaleData = null;

  @property({ type: String })
  protected _locale: Locale = Locale.EN;

  public stateChanged({ app, auth, wizard }: RootState) {
    this._clientId = auth.clientId;
    this._clientSecret = auth.clientSecret;
    this._currentStep = wizard.step;
    this._locale = app.locale;
    this._localeData = app.localeData;
  }

  protected _nextButtonClicked() {
    store.dispatch(updateStep(this._currentStep + 1));
  }

  protected _authorizeButtonClicked() {
    if (!this._clientIdValid || !this._clientSecretValid) {
      return;
    }
    store.dispatch(requestAuthentication(this._clientId, this._clientSecret));
  }

  protected _clientIdModified(e: KeyboardEvent) {
    const {
      validity: { valid },
      value,
    } = e.target as HTMLInputElement;
    this._clientIdValid = valid && !!value;
    store.dispatch(updateClientId(value));
  }

  protected _clientSecretModified(e: KeyboardEvent) {
    const {
      validity: { valid },
      value,
    } = e.target as HTMLInputElement;
    this._clientSecretValid = valid && !!value;
    store.dispatch(updateClientSecret(value));
  }

  protected _localeChanged(e: Event) {
    // For some reason, destructuring doesn't work with HTMLCollectionOf, so we need to cast to any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {
      selectedOptions: [{ value }],
    }: any = e.target as HTMLSelectElement;
    store.dispatch(requestLocaleUpdate(value));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-wizard': Wizard;
  }
}
