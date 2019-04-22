import { html } from 'lit-element';
import { ChatMessage } from './chat-message.component';

export default function template(this: ChatMessage) {
  return html`
    <slot></slot>
  `;
}
