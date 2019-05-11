import { connect } from '@components/helpers';
import { Message } from '@store/chat/chat.model';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './chat.styles';
import template from './chat.template';

@customElement('gad-chat')
export class Chat extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: Array })
  protected _history: Message[] = [];

  public stateChanged({ chat }: RootState) {
    this._history = chat.history;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}
