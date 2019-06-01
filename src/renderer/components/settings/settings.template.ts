import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Settings } from './settings.component';
import { nothing } from 'lit-html';

export default function template(this: Settings) {
  return html`
    <ul role="list">
      ${repeat(
        Object.entries(this._optionsMap),
        ([option]) => option,
        ([option, { icon, external }]) => html`
        <li role="listitem" @click="${this._optionClicked(option)}">
          <div class="material-icons-extended">${icon}</div>
          <div class="text">
            <span class="option">${this._localeData?.settings?.[option]?.option}</span>
            <span class="description">${this._localeData?.settings?.[option]?.description}</span>
          </div>
          ${external ? html`<div class="material-icons-extended">open_in_new</div>` : nothing}
          <mwc-ripple></mwc-ripple>
        </li>
      `)}
    </ul>
  `;
}
