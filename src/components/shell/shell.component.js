import {LitElement} from '@polymer/lit-element';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';
// import settingsStorage from '../../utils/settings-storage';

import template from './shell.template';

/**
 * Google Assistant Desktop shell
 */
class GADShell extends LitElement {
  static get is() {
    return 'gad-shell';
  }

  static get properties() {
    return {
      drawerOpened: {
        type: Boolean,
        value: () => {
          return true;
          // const lsValue = localStorage.getItem('drawerOpened');
          // return typeof lsValue === 'boolean' ? lsValue : true;
        },
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object,
      // This shouldn't be necessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  _render(props) {
    return template(this, props);
  }

  ready() {
    super.ready();
    /* settingsStorage.getItem('drawerToggled')
      .then((val) => this._toggleDrawer(val)); */
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'chat' in that case.
    this.page = page || 'chat';
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    import(
      /* webpackMode: "lazy" */
      `../${page}/${page}.component`
    ).catch(() => this._showPage404());
  }

  _showPage404() {
    this.page = 'view404';
  }
}

window.customElements.define(GADShell.is, GADShell);
