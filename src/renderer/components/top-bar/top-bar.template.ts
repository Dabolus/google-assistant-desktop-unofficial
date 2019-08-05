import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { TopBar } from './top-bar.component';
import { t } from '@lingui/macro';

export default function template(this: TopBar) {
  return html`
    <div class="title">
      ${unsafeHTML(
        this._page === 'settings'
          ? this.localize(t`topBar.settings`)
          : this.localize(t`topBar.assistant`),
      )}
    </div>
    <div class="spacer"></div>
    <button
      class="material-icons-extended"
      @click="${this._page === 'settings'
        ? this._backButtonClicked
        : this._settingsButtonClicked}"
    >
      ${this._page === 'settings' ? 'chevron_right' : 'settings'}
      <mwc-ripple></mwc-ripple>
    </button>
  `;
}
