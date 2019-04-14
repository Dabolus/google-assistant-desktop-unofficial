import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { TopBar } from './top-bar.component';

export default function template(this: TopBar) {
  return html`
    <div class="logo">${unsafeHTML(this._localeData?.topBar?.assistant)}</div>
    <div class="spacer"></div>
    <div class="material-icons-extended" @click="${this._menuButtonClicked}">more_vert</div>
    <div class="menu" role="menu" ?hidden="${!this._menuOpened}">The menu!</div>
  `;
}
