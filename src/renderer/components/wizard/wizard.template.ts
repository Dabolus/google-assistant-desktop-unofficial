import { html } from 'lit-element';
import { Wizard } from './wizard.component';

import '@components/button/button.component';

export default function template(this: Wizard) {
  return html`
    <div class="backdrop"></div>
    <div class="modal">
      <section id="page-0" ?active="${this._currentStep === 0}">
        <img src="assets/intro-header.webp">
        <div>
          <h2>Hi!</h2>
          <p>
            Welcome to your brand new Google Assistant.
          </p>
        </div>
      </section>
      <section id="page-1" ?active="${this._currentStep === 1}">
        <div>
          <h2>First of all, read the disclaimer carefully.</h2>
          <div>
            <h4>Introduction</h4>
            <p>
              This text will give you some information on the Google Assistant Desktop (from now
              on referred as "the software"), the developers that are behind it (from now on
              referred as "the authors"), the technologies and the responsibilities involved
              into its usage and how they can and will affect you. Please, be sure to read this
              text carefully, as pressing the <em>Next</em> button will be considered as a
              confirmation that you have read and acknowledged it in its entirety.
            </p>
            <h4>The software</h4>
            <p>
              Although the software closely resembles the look and feel of the original Google
              Assistant, it is <strong>not</strong> an official Google product. The software
              uses Google Assistant APIs to allow users to interact with the Assistant from
              devices that otherwise won't be able to use it. This means that, unlike the official
              Google products, the software might incur into some limitations applied by Google
              itself. The authors do their best to provide the most straightforward and easiest
              possible interaction with the Google Assistant APIs to the end users, but as humans
              they can make errors. Expect to find some bugs in the product, especially in its
              initial phase of development. Also, to give full transparency to the end users, the
              authors decided to make the software open source. This means that the end users are
              free to browse the source code of the software and to eventually compile the source
              code and contribute to the development of the software itself. The source code of
              the software is available <a href="https://github.com/Dabolus/google-assistant-desktop-unofficial" target="source-code">at this link</a>.
            </p>
            <h4>The assets</h4>
            <p>
              The Google logo (<span class="google-logo">google_logo</span>) and the Google
              Assistant logo (<span class="assistant-logo">google_assistant</span>) are Google
              trademarks. The display, body and icon fonts (Product Sans, Google Sans Display,
              Roboto, Material Icons Extended), as well as most of the assets used by the software
              are made by Google and are freely available on the web.
            </p>
            <h4>Agreement</h4>
            <p>
              By using the software you are fully aware that this is <strong>not</strong> an
              official Google product and you are taking the full responsibility of the
              interactions you will have with the Google services. You are also aware that
              everything this software does is to provide an appealing UI built with Google assets
              for the Google Assistant APIs, so the authors are not responsible for any possible
              copyright infringement. By using the Google Assistant APIs, you are also agreeing to
              the <a href="https://developers.google.com/assistant/sdk/terms-of-service" target="assistant-tos">Google Assistant SDK Terms of Service</a>.
            </p>
        </div>
      </section>
      <section id="page-2" ?active="${this._currentStep === 2}">
        <div>
          <h2>Perfect! Now let's setup a project.</h2>
          <p>
            A Google Cloud Platform project gives your device access to the Google Assistant API.
            The project tracks quota usage and gives you valuable metrics for the requests made
            from your device.
          </p>
          <p>
            In the Cloud Platform Console, <a href="https://console.cloud.google.com/project" target="projects-page">go to the Projects page</a>.
            Select an existing project or create a new project.
          </p>
          <p>
            After creating the project, you also need to enable the Assistant APIs. Click <a href="https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview" target="enable-api">here</a>
            to navigate to the Google API Console and then click <em>Enable</em>.
          </p>
          <p>
            When you're done, come back here and press <em>Next</em>, I'll be waiting for you.
          </p>
        </div>
      </section>
      <section id="page-3" ?active="${this._currentStep === 3}">
        <div>
          <h2>Almost there! Now you just need to authorize me.</h2>
          <p>
            To be able to get access to the project you just created, I will need an OAuth Client
            ID. Click <a href="https://console.developers.google.com/apis/credentials/oauthclient" target="oauth-console">here</a>
            to go to the OAuth credentials creation wizard, give the product name you want if
            required, set <em>Other</em> as application type, give to the client ID the name you
            prefer and then click <em>Create</em>.
          </p>
          <p>
            You should now see a dialog with a Client ID and Secret; just copy/paste them down
            here:
          </p>
          <input type="text" placeholder="Client ID">
          <input type="text" placeholder="Client Secret">
        </div>
      </section>
      <div class="actions">
        <gad-button @click="${this._currentStep >= 3 ? console.log : this._nextButtonClicked}">
          ${this._currentStep >= 3 ? 'Get started' : 'Next'}
        </gad-button>
      </div>
    </div>
  `;
}
