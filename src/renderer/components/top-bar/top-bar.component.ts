import { updateMenuState } from '@gadu/store/lib/app/app.actions';
import { RootState } from '@gadu/store/lib/root/root.model';
import { store } from '@renderer-store';
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
