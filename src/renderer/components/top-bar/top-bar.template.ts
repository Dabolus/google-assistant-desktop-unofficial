import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { TopBar } from './top-bar.component';

export default function template(this: TopBar) {
  return html`
    <div class="title">${unsafeHTML(
      this._page === 'settings'
      ? this._localeData?.topBar?.settings
      : this._localeData?.topBar?.assistant,
    )}</div>
    <div class="spacer"></div>
    <div
      class="material-icons-extended"
      @click="${this._page === 'settings' ? this._backButtonClicked : this._settingsButtonClicked}">
      ${this._page === 'settings' ? 'chevron_right' : 'settings'}
    </div>
  `;
}
