import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Settings } from './settings.component';
import { nothing } from 'lit-html';
import { t } from '@lingui/macro';

export default function template(this: Settings) {
  return html`
    <ul role="list">
      <li role="listitem" @click="${this._optionClicked('donate')}">
        <div class="material-icons-extended">credit_card</div>
        <div class="text">
          <span class="option"
            >${this.localize(t`settings.donate.option`)}</span
          >
          <span class="description"
            >${this.localize(t`settings.donate.description`)}</span
          >
        </div>
        <div class="material-icons-extended">open_in_new</div>
        <mwc-ripple></mwc-ripple>
      </li>
      <li role="listitem" @click="${this._optionClicked('metrics')}">
        <div class="material-icons-extended">finance</div>
        <div class="text">
          <span class="option"
            >${this.localize(t`settings.metrics.option`)}</span
          >
          <span class="description"
            >${this.localize(t`settings.metrics.description`)}</span
          >
        </div>
        <div class="material-icons-extended">open_in_new</div>
        <mwc-ripple></mwc-ripple>
      </li>
      <li role="listitem" @click="${this._optionClicked('logout')}">
        <div class="material-icons-extended">logout</div>
        <div class="text">
          <span class="option"
            >${this.localize(t`settings.logout.option`)}</span
          >
          <span class="description"
            >${this.localize(t`settings.logout.description`)}</span
          >
        </div>
        <mwc-ripple></mwc-ripple>
      </li>
    </ul>
  `;
}
