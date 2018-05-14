import { html } from 'lit-html/lib/lit-extended';
import { store } from '../../store';
import { updateDrawerState } from '../../actions/shell';
import { menuIcon } from '../icons';

import style from './chat.style';

export default (chat, { appTitle, _page, _drawerOpened, _snackbarOpened, _offline }) => html`
  ${html([`<style>${style}</style>`])}
  <!-- Header -->
  <app-header condenses reveals effects="waterfall">
    <app-toolbar class="toolbar-top">
      <button class="menu-btn" title="Menu" on-click="${() => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
      <div main-title>${appTitle}</div>
    </app-toolbar>

    <!-- This gets hidden on a small screen-->
    <nav class="toolbar-list">
      <a selected?="${_page === 'view1'}" href="/view1">View One</a>
      <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
      <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
    </nav>
  </app-header>

  <!-- Drawer content -->
  <app-drawer opened="${_drawerOpened}" on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
    <nav class="drawer-list">
      <a selected?="${_page === 'view1'}" href="/view1">View One</a>
      <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
      <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
    </nav>
  </app-drawer>

  <!-- Main content -->
  <main class="main-content">
    <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
    <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
    <my-view3 class="page" active?="${_page === 'view3'}"></my-view3>
    <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
  </main>

  <footer></footer>

  <snack-bar active?="${_snackbarOpened}">You are now ${_offline ? 'offline' : 'online'}.</snack-bar>`;
