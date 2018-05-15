import { html } from 'lit-html/lib/lit-extended';
import { store } from '~/store';
import { updateDrawerState } from '~/actions/shell';
import { menu as menuIcon } from '~/components/icons';

import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import style from './shell.style';

export default (shell, { _page, _headerTitleKey, _headerTitleExtraKey, _drawerOpened, _offline }) => html`
  ${html([`<style>${style}</style>`])}
  <!-- Header -->
  ${_page !== 'wizard' && html`
    <app-header class$="${_page === 'chat' ? '' : 'light'}" condenses reveals effects="waterfall">
      <app-toolbar>
        <div main-title>${shell.localize(_headerTitleKey)} <sup class="thin">${shell.localize(_headerTitleExtraKey)}</sup></div>
        <button class="menu-btn" title="Menu" on-click="${() => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
      </app-toolbar>
    </app-header>`}

  <!-- Main content -->
  <main class="main-content">
    <gad-chat class="page" active?="${_page === 'chat'}"></gad-chat>
  </main>`;
