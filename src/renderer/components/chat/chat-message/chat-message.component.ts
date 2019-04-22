import { MessageType } from '@store/chat/chat.model';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './chat-message.styles';
import template from './chat-message.template';

@customElement('gad-chat-message')
export class ChatMessage extends LitElement {
  public static styles = [sharedStyles, styles];

  @property({ type: String })
  public type: MessageType;

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat-message': ChatMessage;
  }
}
