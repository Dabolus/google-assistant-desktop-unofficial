import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Chat } from './chat.component';
import { MessageType } from '@store/chat/chat.model';

import './chat-message/chat-message.component';

export default function template(this: Chat) {
  return html`
    <div>
      ${repeat(
        this._history,
        ({ timestamp }) => timestamp,
        (message, index) => html`
          <gad-chat-message
            type="${message.type}"
            ?contiguous="${message.type === this._history[index - 1]?.type &&
              message.timestamp - (this._history[index - 1]?.timestamp || 0) <
                30000}"
            picture="${message.type === MessageType.IN
              ? 'assets/google-assistant-logo.svg'
              : this._userPicture}"
          >
            ${unsafeHTML(
              message.text.replace(/\s+---.+/s, '').replace(/\n/g, '<br>'),
            )}
          </gad-chat-message>
        `,
      )}
    </div>
  `;
}
