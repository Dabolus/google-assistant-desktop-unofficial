import { store } from '@store/index';
import { customElement, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './bottom-bar.styles';
import template from './bottom-bar.template';

@customElement('gad-bottom-bar')
export class BottomBar extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-bottom-bar': BottomBar;
  }
}
