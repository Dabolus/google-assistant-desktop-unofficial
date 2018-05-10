import {html} from 'lit-html/lib/lit-extended';

import style from './shell.style';

export default (shell, props) => html`
  ${html([`<style>${style}</style>`])}
  <div id="background"></div>
  <app-location
      route="${props.route}"
      url-space-regex="^${props.rootPath}">
  </app-location>
  
  <app-route
      route="${props.route}"
      pattern="${props.rootPath}:page"
      data="${props.routeData}"
      tail="${props.subroute}">
  </app-route>
  
  <app-drawer-layout fullbleed>
    <!-- Drawer content -->
    <app-drawer id="drawer" slot="drawer" persistent opened="${props.drawerOpened}">
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="${props.page}" attr-for-selected="name" class="drawer-list" role="navigation">
        <a name="chat" href="${props.rootPath}chat">Chat</a>
        <a name="view2" href="${props.rootPath}view2">View Two</a>
        <a name="view3" href="${props.rootPath}view3">View Three</a>
      </iron-selector>
    </app-drawer>
  
    <!-- Main content -->
    <app-header-layout has-scrolling-region>
      <app-header slot="header" condenses reveals effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="my-icons:menu" drawer-toggle></paper-icon-button>
          <div main-title>Google Assistant Desktop</div>
        </app-toolbar>
      </app-header>
  
      <iron-pages
          selected="${props.page}"
          attr-for-selected="name"
          fallback-selection="chat"
          role="main">
        <gad-chat name="chat"></gad-chat>
      </iron-pages>
    </app-header-layout>
  </app-drawer-layout>`;
