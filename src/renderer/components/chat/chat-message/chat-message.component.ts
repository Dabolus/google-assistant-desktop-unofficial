import { MessageType } from '@store/chat/chat.model';
import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './chat-message.styles';
import template from './chat-message.template';

@customElement('gad-chat-message')
export class ChatMessage extends LitElement {
  public static styles = [sharedStyles, styles];

  @property({ type: String })
  public type: MessageType = MessageType.OUT;

  @property({ type: Boolean })
  public contiguous: boolean = false;

  protected render = template;
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat-message': ChatMessage;
  }
}
