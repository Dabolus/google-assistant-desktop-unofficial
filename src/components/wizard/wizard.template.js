import {html} from 'lit-html/lib/lit-extended';

import style from './wizard.style';

export default (wizard, props) => html`
  <style>${html([style])}</style>
  <ul class="steps">
    <li label="Agree">
    </li>
    <li label="Configure">
      <ol>
        <li>
          <p>Open the Actions Console.</p>
          <p><a class="button button-primary" target="_blank" href="https://console.actions.google.com/">Go
          to the Actions Console</a></p>
        </li>
        <li>
          <p>Click on <strong>Add/import project</strong>.</p>
        </li>
        <li>
          <p>To create a new project, type a name in the <strong>Project name</strong> box and click
            <strong>CREATE PROJECT</strong>.</p>
          <p>If you already have an existing Google Cloud Platform project, you can select
          that project and import it instead.</p>
          <p><img alt="Add/import project" class="screenshot" src="https://developers.google.com/assistant/sdk/images/add-project-aog.png"></p>
        </li>
        <li>
          <p>Click the <strong>Device registration</strong> box.</p>
          <p><img alt="Device registration" class="screenshot" src="https://developers.google.com/assistant/sdk/images/console/device-registration-card.png"></p>
        </li>
        <li>
          <p>Enable the Google Assistant API on the project you selected (see the <a href="https://developers.google.com/assistant/sdk/terms-of-service">Terms
            of Service</a>). You need to do this in the
            Cloud Platform Console.</p>
          <p><a class="button button-primary" target="_blank" href="https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview">Enable
          the API</a></p>
          <p>Click <strong>Enable</strong>.</p>
        </li>
        <li>
          <p>Open the <a href="https://myaccount.google.com/activitycontrols">Activity Controls page</a>
          for the Google account that you want to use with the Assistant. You can use any
          Google account, it does not need to be your developer account.</p>
        </li>
        <li>
          <b>Ensure the following toggle switches are enabled (blue):</b>
          <ul>
            <li>
              Web & App Activity
              <ul>
                <li>In addition, be sure to select the <strong>Include Chrome browsing history and
                activity from websites and apps that use Google services</strong> checkbox.</li>
              </ul>
            </li>
            <li>Device Information</li>
            <li>Voice & Audio Activity</li>
          </ul>
        </li>
      </ol>
    </li>
    <li label="Register">
      <ol>
        <li>
          <p>Head back to the <a class="external" href="https://console.actions.google.com/">Actions Console</a>.</p>
        </li>
        <li>
          <p>Select the project you created previously.</p>
        </li>
        <li>
          <p>Select the <strong>Device registration</strong> tab (under <strong>ADVANCED OPTIONS</strong>) from
            the left navbar.</p>
        </li>
        <li>
          <p>Click the <strong>REGISTER MODEL</strong> button.</p>
          <p><img alt="Device models tab" class="screenshot" src="https://developers.google.com/assistant/sdk/images/console/device-models-aog.png"></p>
        </li>
        <li>
          <p>Fill out all of the fields for your device.</p>
          <p>See the device model JSON
          <a href="https://developers.google.com/assistant/sdk/reference/device-registration/model-and-instance-schemas.html#device_model_json">reference</a>
          for more information on these fields.</p>
        </li>
        <li>
          <p>When you are finished, click <strong>REGISTER MODEL</strong>.</p>
          <p><img alt="Create model" class="screenshot" src="https://developers.google.com/assistant/sdk/images/console/create-model.png"></p>
        </li>
      </ol>
    </li>
  </ul>`;
