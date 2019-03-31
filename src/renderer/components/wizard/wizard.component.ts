import { updateClientId, updateClientSecret } from '@store/auth/auth.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { updateStep } from '@store/wizard/wizard.actions';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './wizard.styles';
import template from './wizard.template';

@customElement('gad-wizard')
export class Wizard extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  @property({ type: Number })
  protected _currentStep = 0;

  @property({ type: String })
  protected _clientId = '';

  @property({ type: String })
  protected _clientSecret = '';

  public stateChanged({ wizard }: RootState) {
    this._currentStep = wizard.step;
  }

  protected render() {
    return template.call(this);
  }

  protected _nextButtonClicked() {
    store.dispatch(updateStep(this._currentStep + 1));
  }

  protected _clientIdModified() {
    store.dispatch(updateClientId(this._clientId));
  }

  protected _clientSecretModified() {
    store.dispatch(updateClientSecret(this._clientSecret));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-wizard': Wizard;
  }
}
