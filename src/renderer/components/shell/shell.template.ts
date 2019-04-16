import { html } from 'lit-element';
import { Shell } from './shell.component';

import '@components/bottom-bar/bottom-bar.component';
import '@components/chat/chat.component';
import '@components/top-bar/top-bar.component';
import '@components/wizard/wizard.component';

export default function template(this: Shell) {
  return html`
    <gad-top-bar role="heading"></gad-top-bar>
    <gad-chat></gad-chat>
    <gad-bottom-bar></gad-bottom-bar>
    <gad-wizard ?shown="${this._page === 'wizard'}"></gad-wizard>
  `;
}
