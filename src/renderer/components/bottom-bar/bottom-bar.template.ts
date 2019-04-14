import { html } from 'lit-element';
import { BottomBar } from './bottom-bar.component';

import '@material/mwc-ripple';

export default function template(this: BottomBar) {
  return html`
    <input
      type="text"
      placeholder="${this._localeData?.bottomBar?.placeholder}"
      autofocus
      @input="${this._inputModified}"
      @keydown="${this._inputKeyDown}"
      value="${this._text}">
    <button>
      <img src="assets/${this._text ? 'send' : 'google-mic'}.svg">
      <mwc-ripple></mwc-ripple>
    </button>
  `;
}
