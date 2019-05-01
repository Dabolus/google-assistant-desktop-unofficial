import { MessageType } from '@store/chat/chat.model';
import { html } from 'lit-element';
import { ChatMessage } from './chat-message.component';

export default function template(this: ChatMessage) {
  return html`
    <img
      class="pic"
      src="${this.type === MessageType.IN ? 'assets/google-assistant-logo.svg' : '' /* TODO: get user image */}">
    <div class="bubble">
      <slot></slot>
    </div>
  `;
}
