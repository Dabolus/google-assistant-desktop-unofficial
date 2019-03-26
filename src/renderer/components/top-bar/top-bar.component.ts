import { updateMenuState } from '@store/app/app.actions';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './top-bar.styles';
import template from './top-bar.template';

@customElement('gad-top-bar')
export class TopBar extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  @property({ type: Boolean })
  protected _menuOpened = false;

  public stateChanged(state: RootState) {
    this._menuOpened = state.app.menuOpened;
  }

  protected render() {
    return template.call(this);
  }

  protected _menuButtonClicked() {
    store.dispatch(updateMenuState(!this._menuOpened));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-top-bar': TopBar;
  }
}
