import { store } from '@store/index';
import { customElement, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './chat.styles';
import template from './chat.template';

@customElement('gad-chat')
export class Chat extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}
