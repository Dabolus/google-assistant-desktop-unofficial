import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Chat } from './chat.component';

import './chat-message/chat-message.component';

export default function template(this: Chat) {
  return html`
    ${repeat(this._history, (message) => html`
      <gad-chat-message type="${message.type}">
        ${unsafeHTML(message.text.replace('\n', '<br>'))}
      </gad-chat-message>
    `)}
  `;
}
