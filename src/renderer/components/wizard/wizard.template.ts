import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Wizard } from './wizard.component';

import '@components/button/button.component';

export default function template(this: Wizard) {
  return html`
    <div class="backdrop"></div>
    <div class="modal">
      <div class="content">
        <section id="step-0" ?active="${this._currentStep === 0}">
          <div class="intro-header"></div>
          <div class="intro-content">
            <h2>${this._localeData?.wizard?.steps?.[0]?.hi}</h2>
            <p>${this._localeData?.wizard?.steps?.[0]?.welcome}</p>
          </div>
        </section>
        <section id="step-1" ?active="${this._currentStep === 1}">
          <h2>${this._localeData?.wizard?.steps?.[1]?.title}</h2>
          <div>
            <h4>${this._localeData?.wizard?.steps?.[1]?.disclaimer?.introduction?.title}</h4>
            <p>
              ${unsafeHTML(this._localeData?.wizard?.steps?.[1]?.disclaimer?.introduction?.text)}
            </p>
            <h4>${this._localeData?.wizard?.steps?.[1]?.disclaimer?.software?.title}</h4>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[1]?.disclaimer?.software?.text)}</p>
            <h4>${this._localeData?.wizard?.steps?.[1]?.disclaimer?.assets?.title}</h4>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[1]?.disclaimer?.assets?.text)}</p>
            <h4>${this._localeData?.wizard?.steps?.[1]?.disclaimer?.agreement?.title}</h4>
            <p>
              ${unsafeHTML(this._localeData?.wizard?.steps?.[1]?.disclaimer?.agreement?.text)}
            </p>
          </div>
        </section>
        <section id="step-2" ?active="${this._currentStep === 2}">
          <h2>${this._localeData?.wizard?.steps?.[2]?.title}</h2>
          <div>
            <p>${this._localeData?.wizard?.steps?.[2]?.text}</p>
            <select size="5" @change="${this._localeChanged}">
              <option value="EN" ?selected=${this._locale === 'EN'}>English</option>
            </select>
          </div>
        </section>
        <section id="step-3" ?active="${this._currentStep === 3}">
          <h2>${this._localeData?.wizard?.steps?.[3]?.title}</h2>
          <div>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[3]?.text?.[0])}</p>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[3]?.text?.[1])}</p>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[3]?.text?.[2])}</p>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[3]?.text?.[3])}</p>
          </div>
        </section>
        <section id="step-4" ?active="${this._currentStep === 4}">
          <h2>${this._localeData?.wizard?.steps?.[4]?.title}</h2>
          <div>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[4]?.text?.[0])}</p>
            <ul>
              <li>email</li>
              <li>profile</li>
              <li>openid</li>
              <li>https://www.googleapis.com/auth/assistant-sdk-prototype</li>
            </ul>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[4]?.text?.[1])}</p>
          </div>
        </section>
        <section id="step-5" ?active="${this._currentStep === 5}">
          <h2>${this._localeData?.wizard?.steps?.[5]?.title}</h2>
          <div>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[5]?.text?.[0])}</p>
            <p>${unsafeHTML(this._localeData?.wizard?.steps?.[5]?.text?.[1])}</p>
            <input
              type="text"
              placeholder="${this._localeData?.wizard?.steps?.[5]?.idPlaceholder}"
              pattern="^\\d{12}-[\\da-z]{32}\\.apps\\.googleusercontent\\.com$"
              @input="${this._clientIdModified}"
              value="${this._clientId}">
            <input
              type="text"
              placeholder="${this._localeData?.wizard?.steps?.[5]?.secretPlaceholder}"
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
            ? this._localeData?.wizard?.actions?.authorize
            : this._localeData?.wizard?.actions?.next}
        </gad-button>
      </div>
    </div>
  `;
}
