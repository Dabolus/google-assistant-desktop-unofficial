import { html } from 'lit-element';
import { TopBar } from './top-bar.component';

export default function template(this: TopBar) {
  return html`
    <img src="assets/google-logo.svg">
    <div class="heading">Assistant</div>
    <div class="spacer"></div>
    <div class="material-icons-extended" @click="${this._menuButtonClicked}">more_vert</div>
    <div class="menu" role="menu" ?hidden="${!this._menuOpened}">The menu!</div>
  `;
}
