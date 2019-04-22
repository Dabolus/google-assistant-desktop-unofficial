import { Message } from '@store/chat/chat.model';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import styles from './chat.styles';
import template from './chat.template';

@customElement('gad-chat')
export class Chat extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  @property({ type: Array })
  protected _history: Message[] = [];

  public stateChanged({ chat }: RootState) {
    this._history = chat.history;
  }

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}
