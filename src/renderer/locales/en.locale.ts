import { LocaleData } from './model';

const en: LocaleData = {
  topBar: {
    assistant:
      '<img src="assets/google-logo.svg">' +
      '<div class="heading">Assistant</div>',
    settings: '<div class="heading">Settings</div>',
  },
  settings: {
    logout: {
      option: 'Logout',
      description: 'Disconnect from Google Assistant',
    },
  },
  chat: {},
  bottomBar: {
    placeholder: 'Type a message',
  },
  wizard: {
    steps: [
      {
        hi: 'Hi!',
        welcome: 'Welcome to your brand new Google Assistant.',
      },
      {
        title: 'First of all, read the disclaimer carefully.',
        disclaimer: {
          introduction: {
            title: 'Introduction',
            text:
              'This text will give you some information on the Google Assistant Desktop ' +
              '(hereinafter referred to as "the software"), the developers that are behind ' +
              'it (hereinafter referred to as "the authors"), the technologies and the ' +
              'responsibilities involved into its usage and how they can and will affect you. ' +
              'Please, be sure to read this text carefully, as pressing the <em>Next</em> ' +
              'button will be considered as a confirmation that you have read and ' +
              'acknowledged it in its entirety.',
          },
          software: {
            title: 'The software',
            text:
              'Although the software closely resembles the look and feel of the original Google ' +
              'Assistant, it is <strong>not</strong> an official Google product. The software ' +
              'uses Google Assistant APIs to allow users to interact with the Assistant from ' +
              'devices that otherwise won\'t be able to use it. This means that, unlike the ' +
              'official Google products, the software might incur into some limitations applied ' +
              'by Google itself. The authors do their best to provide the most straightforward ' +
              'and easiest possible interaction with the Google Assistant APIs to the end users, ' +
              'but as humans they can make errors. Expect to find some bugs in the product, ' +
              'especially in its initial phase of development. Also, to give full transparency ' +
              'to the end users, the authors decided to make the software open source. This ' +
              'means that the end users are free to browse the source code of the software and ' +
              'to eventually compile the source code and contribute to the development of the ' +
              'software itself. The source code of the software is available <a href="https://github.com/Dabolus/google-assistant-desktop-unofficial" target="source-code">at this link</a>.',
          },
          assets: {
            title: 'The assets',
            text:
              'The Google logo (<span class="google-logo">google_logo</span>) and the Google ' +
              'Assistant logo (<span class="assistant-logo">google_assistant</span>) are Google ' +
              'trademarks. The display, body and icon fonts (Product Sans, Google Sans Display, ' +
              'Roboto, Material Icons Extended), as well as most of the assets used by the ' +
              'software are made by Google and are freely available on the web.',
          },
          agreement: {
            title: 'Agreement',
            text:
              'By using the software you are fully aware that this is <strong>not</strong> an ' +
              'official Google product and you are taking the full responsibility of the ' +
              'interactions you will have with the Google services. You are also aware that ' +
              'everything this software does is to provide an appealing UI built with Google ' +
              'assets for the Google Assistant APIs, so the authors are not responsible for ' +
              'any possible copyright infringement. By using the Google Assistant APIs, you ' +
              'are also agreeing to the <a href="https://developers.google.com/assistant/sdk/terms-of-service" target="assistant-tos">Google Assistant SDK Terms of Service</a>.',
          },
        },
      },
      {
        title: 'Are you ok with this language?',
        text:
          'I did my best to detect your language, but I\'m not completely sure it\'s the right ' +
          'one. Do you wish to change it?',
      },
      {
        title: 'Perfect! Now let\'s setup a project.',
        text: [
          'A Google Cloud Platform project gives your device access to the Google Assistant API. ' +
          'The project tracks quota usage and gives you valuable metrics for the requests made ' +
          'from your device.',

          'In the Cloud Platform Console, <a href="https://console.cloud.google.com/project" target="projects-page">go to the Projects page</a>. ' +
          'Select an existing project or create a new project.',

          'After creating the project, you also need to enable the Assistant APIs. Click <a href="https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview" target="enable-api">here</a> ' +
          'to navigate to the Google API Console and then click <em>Enable</em>.',

          'When you\'re done, come back here and press <em>Next</em>, I\'ll be waiting for you.',
        ],
      },
      {
        title: 'Almost there! Now you just need to authorize me.',
        text: [
          'To be able to get access to the project you just created, I will need an OAuth Client ' +
          'ID. Click <a href="https://console.developers.google.com/apis/credentials/oauthclient" target="oauth-console">here</a> ' +
          'to go to the OAuth credentials creation wizard, give the product name you want if ' +
          'required, set <em>Other</em> as application type, give to the client ID the name you ' +
          'prefer and then click <em>Create</em>.',

          'You should now see a dialog with a Client ID and Secret; just copy/paste them down ' +
          'here:',
        ],
        idPlaceholder: 'Client ID',
        secretPlaceholder: 'Client Secret',
      },
    ],
    actions: {
      authorize: 'Authorize',
      next: 'Next',
    },
  },
};

export default en;
