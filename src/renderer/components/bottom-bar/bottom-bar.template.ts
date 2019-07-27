import { html } from 'lit-element';
import { BottomBar } from './bottom-bar.component';
import { t } from '@lingui/macro';

import '@material/mwc-ripple';

export default function template(this: BottomBar) {
  return html`
    <input
      type="text"
      placeholder="${this._i18nService.i18n._(t`Type a message`)}"
      autofocus
      @input="${this._inputModified}"
      @keydown="${this._inputKeyDown}"
      value="${this._text}">
    <button @click="${this._text ? this._textSubmitted : this._startRecordingClicked}">
      <img src="assets/${this._text ? 'send' : 'google-mic'}.svg">
      <mwc-ripple></mwc-ripple>
    </button>
  `;
}
