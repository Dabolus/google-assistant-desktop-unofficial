import { connect } from '@components/helpers';
import { Message } from '@store/chat/chat.model';
import { store } from '@store/index';
import { RootState } from '@store/root/root.model';
import { customElement, LitElement, property, query } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './chat.styles';
import template from './chat.template';

@customElement('gad-chat')
export class Chat extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: Array })
  protected _history: Message[] = [];

  @property({ type: String })
  protected _userPicture = '';

  @query('div')
  private _containerRef: HTMLDivElement;

  public async stateChanged({ auth, chat }: RootState) {
    this._userPicture = auth.userPicture;
    const oldHistoryLength = this._history.length;
    const newHistoryLength = chat.history.length;
    this._history = chat.history;
    if (this._containerRef && newHistoryLength !== oldHistoryLength) {
      await this.updateComplete;
      this._containerRef.scroll({
        top: this._containerRef.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}
