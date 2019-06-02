import { MessageType } from '@store/chat/chat.model';
import { html } from 'lit-element';
import { ChatMessage } from './chat-message.component';
import { nothing } from 'lit-html';

export default function template(this: ChatMessage) {
  return html`
    ${this.contiguous ? nothing : html`
      <img
        class="pic"
        src="${this.type === MessageType.IN ? 'assets/google-assistant-logo.svg' : '' /* TODO: get user image */}">
    `}
    <div class="bubble${this.contiguous ? ' contiguous' : ''}">
      <slot></slot>
    </div>
  `;
}
