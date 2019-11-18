import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { Wizard } from './wizard.component';
import { t } from '@lingui/macro';
import { Locale } from '@store/app/app.model';
import { nothing } from 'lit-html';

import '@components/button/button.component';

export default function template(this: Wizard) {
  return html`
    <div class="backdrop"></div>
    <div class="modal">
      <div class="content">
        <section id="step-0" ?active="${this._currentStep === 0}">
          <div class="intro-header"></div>
          <div class="intro-content">
            <h2>${this.localize(t`wizard.step1.hi`)}</h2>
            <p>${this.localize(t`wizard.step1.welcome`)}</p>
          </div>
        </section>
        <section id="step-1" ?active="${this._currentStep === 1}">
          <h2>${this.localize(t`wizard.step2.title`)}</h2>
          <div>
            <h4>
              ${this.localize(t`wizard.step2.disclaimer.introduction.title`)}
            </h4>
            <p>
              ${unsafeHTML(
                this.localize(t`wizard.step2.disclaimer.introduction.text`),
              )}
            </p>
            <h4>${this.localize(t`wizard.step2.disclaimer.software.title`)}</h4>
            <p>
              ${unsafeHTML(
                this.localize(t`wizard.step2.disclaimer.software.text`),
              )}
            </p>
            <h4>${this.localize(t`wizard.step2.disclaimer.assets.title`)}</h4>
            <p>
              ${unsafeHTML(
                this.localize(t`wizard.step2.disclaimer.assets.text`),
              )}
            </p>
            <h4>
              ${this.localize(t`wizard.step2.disclaimer.agreement.title`)}
            </h4>
            <p>
              ${unsafeHTML(
                this.localize(t`wizard.step2.disclaimer.agreement.text`),
              )}
            </p>
          </div>
        </section>
        <section id="step-2" ?active="${this._currentStep === 2}">
          <h2>${this.localize(t`wizard.step3.title`)}</h2>
          <div>
            <p>${this.localize(t`wizard.step3.text`)}</p>
            <select size="5" @change="${this._localeChanged}">
              <option value="en-US" ?selected=${this._locale === Locale.EN_US}
                >English (United States)</option
              >
              <option value="en-AU" ?selected=${this._locale === Locale.EN_AU}
                >English (Australia)</option
              >
              <option value="en-CA" ?selected=${this._locale === Locale.EN_CA}
                >English (Canada)</option
              >
              <option value="en-GB" ?selected=${this._locale === Locale.EN_GB}
                >English (Great Britain)</option
              >
              <option value="en-IN" ?selected=${this._locale === Locale.EN_IN}
                >English (India)</option
              >
              <option value="de-DE" ?selected=${this._locale === Locale.DE_DE}
                >Deutsch (Deutschland)</option
              >
              <option value="fr-CA" ?selected=${this._locale === Locale.FR_CA}
                >Français (Canada)</option
              >
              <option value="fr-FR" ?selected=${this._locale === Locale.FR_FR}
                >Français (France)</option
              >
              <option value="it-IT" ?selected=${this._locale === Locale.IT_IT}
                >Italiano (Italia)</option
              >
              <option value="ja-JP" ?selected=${this._locale === Locale.JA_JP}
                >日本語（日本）</option
              >
              <option value="es-ES" ?selected=${this._locale === Locale.ES_ES}
                >Español (España)</option
              >
              <option value="es-MX" ?selected=${this._locale === Locale.ES_MX}
                >Español (México)</option
              >
              <option value="ko-KR" ?selected=${this._locale === Locale.KO_KR}
                >한국어 (대한민국)</option
              >
              <option value="pt-BR" ?selected=${this._locale === Locale.PT_BR}
                >Português (Brasil)</option
              >
            </select>
          </div>
        </section>
        <section id="step-3" ?active="${this._currentStep === 3}">
          <h2>${this.localize(t`wizard.step4.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.localize(t`wizard.step4.text.part1`))}</p>
            <p>${unsafeHTML(this.localize(t`wizard.step4.text.part2`))}</p>
            <p>${unsafeHTML(this.localize(t`wizard.step4.text.part3`))}</p>
            <p>${unsafeHTML(this.localize(t`wizard.step4.text.part4`))}</p>
          </div>
        </section>
        <section id="step-4" ?active="${this._currentStep === 4}">
          <h2>${this.localize(t`wizard.step5.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.localize(t`wizard.step5.text.part1`))}</p>
            <ul>
              <li>email</li>
              <li>profile</li>
              <li>openid</li>
              <li>https://www.googleapis.com/auth/assistant-sdk-prototype</li>
            </ul>
            <p>${unsafeHTML(this.localize(t`wizard.step5.text.part2`))}</p>
          </div>
        </section>
        <section id="step-5" ?active="${this._currentStep === 5}">
          <h2>${this.localize(t`wizard.step6.title`)}</h2>
          <div>
            <p>${unsafeHTML(this.localize(t`wizard.step6.text.part1`))}</p>
            <p>${unsafeHTML(this.localize(t`wizard.step6.text.part2`))}</p>
            <input
              type="text"
              placeholder="${this.localize(t`wizard.step6.idPlaceholder`)}"
              pattern="^\\d{12}-[\\da-z]{32}\\.apps\\.googleusercontent\\.com$"
              @input="${this._clientIdModified}"
              value="${this._clientId}"
            />
            <input
              type="text"
              placeholder="${this.localize(t`wizard.step6.secretPlaceholder`)}"
              pattern="^[\\w-]{24}$"
              @input="${this._clientSecretModified}"
              value="${this._clientSecret}"
            />
          </div>
        </section>
      </div>
      <div class="actions ${this._currentStep === 0 ? 'centered' : ''}">
        ${this._currentStep > 0
          ? html`
              <gad-button @click="${this._previousButtonClicked}">
                ${this.localize(t`wizard.actions.previous`)}
              </gad-button>
            `
          : nothing}
        <gad-button
          @click="${this._currentStep === 5
            ? this._authorizeButtonClicked
            : this._nextButtonClicked}"
          ?disabled="${this._currentStep === 5 &&
            (!this._clientIdValid || !this._clientSecretValid)}"
        >
          ${this._currentStep === 5
            ? this.localize(t`wizard.actions.authorize`)
            : this.localize(t`wizard.actions.next`)}
        </gad-button>
      </div>
    </div>
  `;
}
