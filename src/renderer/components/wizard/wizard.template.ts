import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Wizard } from './wizard.component';
import { t } from '@lingui/macro';

import '@components/button/button.component';

export default function template(this: Wizard) {
  return html`
    <div class="backdrop"></div>
    <div class="modal">
      <div class="content">
        <section id="step-0" ?active="${this._currentStep === 0}">
          <div class="intro-header"></div>
          <div class="intro-content">
            <h2>${this.translate(t`wizard.step1.hi`)}</h2>
            <p>${this.translate(t`wizard.step1.welcome`)}</p>
          </div>
        </section>
        <section id="step-1" ?active="${this._currentStep === 1}">
          <h2>${this.translate(t`wizard.step2.title`)}</h2>
          <div>
            <h4>${this.translate(t`wizard.step2.disclaimer.introduction.title`)}</h4>
            <p>
              ${unsafeHTML(this.translate(t`wizard.step2.disclaimer.introduction.text`))}
            </p>
            <h4>${this.translate(t`wizard.step2.disclaimer.software.title`)}</h4>
            <p>${unsafeHTML(this.translate(t`wizard.step2.disclaimer.software.text`))}</p>
            <h4>${this.translate(t`wizard.step2.disclaimer.assets.title`)}</h4>
            <p>${unsafeHTML(this.translate(t`wizard.step2.disclaimer.assets.text`))}</p>
            <h4>${this.translate(t`wizard.step2.disclaimer.agreement.title`)}</h4>
            <p>
              ${unsafeHTML(this.translate(t`wizard.step2.disclaimer.agreement.text`))}
            </p>
          </div>
        </section>
        <section id="step-2" ?active="${this._currentStep === 2}">
          <h2>${this.translate(t`wizard.step3.title`)}</h2>
          <div>
            <p>${this.translate(t`wizard.step3.text`)}</p>
            <select size="5" @change="${this._localeChanged}">
              <option value="EN" ?selected=${this._locale === 'EN'}>English</option>
            </select>
          </div>
        </section>
        <section id="step-3" ?active="${this._currentStep === 3}">
          <h2>${this.translate(t`wizard.step4.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.translate(t`wizard.step4.text.part1`))}</p>
            <p>${unsafeHTML(this.translate(t`wizard.step4.text.part2`))}</p>
            <p>${unsafeHTML(this.translate(t`wizard.step4.text.part3`))}</p>
            <p>${unsafeHTML(this.translate(t`wizard.step4.text.part4`))}</p>
          </div>
        </section>
        <section id="step-4" ?active="${this._currentStep === 4}">
          <h2>${this.translate(t`wizard.step5.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.translate(t`wizard.step5.text.part1`))}</p>
            <ul>
              <li>email</li>
              <li>profile</li>
              <li>openid</li>
              <li>https://www.googleapis.com/auth/assistant-sdk-prototype</li>
            </ul>
            <p>${unsafeHTML(this.translate(t`wizard.step5.text.part2`))}</p>
          </div>
        </section>
        <section id="step-5" ?active="${this._currentStep === 5}">
          <h2>${this.translate(t`wizard.step6.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.translate(t`wizard.step6.text.part1`))}</p>
            <p>${unsafeHTML(this.translate(t`wizard.step6.text.part2`))}</p>
            <input
              type="text"
              placeholder="${this.translate(t`wizard.step6.idPlaceholder`)}"
              pattern="^\\d{12}-[\\da-z]{32}\\.apps\\.googleusercontent\\.com$"
              @input="${this._clientIdModified}"
              value="${this._clientId}">
            <input
              type="text"
              placeholder="${this.translate(t`wizard.step6.secretPlaceholder`)}"
              pattern="^[\\w-]{24}$"
              @input="${this._clientSecretModified}"
              value="${this._clientSecret}">
          </div>
        </section>
      </div>
      <div class="actions">
        <gad-button
          @click="${this._currentStep === 5
            ? this._authorizeButtonClicked
            : this._nextButtonClicked}"
          ?disabled="${this._currentStep === 5 &&
            (!this._clientIdValid || !this._clientSecretValid)}">
          ${this._currentStep >= 5
            ? this.translate(t`wizard.actions.authorize`)
            : this.translate(t`wizard.actions.next`)}
        </gad-button>
      </div>
    </div>
  `;
}
