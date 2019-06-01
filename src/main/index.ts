import { container } from '@helpers/di.helper';
import { BrowserWindowWithEvents } from '@helpers/events.helper';
import { Environment, EnvironmentService } from '@services/environment.service';
import { app, Menu, shell, systemPreferences } from 'electron';
import { resolve } from 'path';
import { format as formatUrl } from 'url';

const environmentService: Environment = container.get(EnvironmentService);

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindowWithEvents | null;

async function configureDevTools(window: BrowserWindowWithEvents) {
  const { default: installExtension, REDUX_DEVTOOLS } = await import(
    'electron-devtools-installer'
  );
  await installExtension(REDUX_DEVTOOLS);
  window.webContents.openDevTools();
}

function createMenu(window: BrowserWindowWithEvents) {
  const menu = Menu.buildFromTemplate([
    ...(environmentService.mac
      ? ([
          {
            label: app.getName(),
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ] as any)
      : []),
    { role: 'fileMenu' },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        ...(environmentService.development
          ? [
              { role: 'reload' },
              { role: 'forcereload' },
              { role: 'toggledevtools' },
              { type: 'separator' },
            ]
          : []),
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    { role: 'windowMenu' },
    {
      label: 'User',
      submenu: [
        {
          label: 'Logout',
          click: () => window.webContents.send('auth.requestLogout'),
        },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Contribute',
          click: () =>
            shell.openExternal(
              'https://github.com/Dabolus/google-assistant-desktop-unofficial',
            ),
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
}

function createMainWindow() {
  const window = new BrowserWindowWithEvents({
    center: true,
    minWidth: 360,
    minHeight: 540,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  createMenu(window);

  if (environmentService.development) {
    window.loadURL(
      `http://localhost:8080#${
        systemPreferences.isDarkMode && systemPreferences.isDarkMode()
          ? 'dark'
          : 'light'
      }`,
    );
    configureDevTools(window);
  } else {
    window.loadURL(
      formatUrl({
        pathname: resolve(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
        hash:
          systemPreferences.isDarkMode && systemPreferences.isDarkMode()
            ? 'dark'
            : 'light',
      }),
    );
  }

  window.once('closed', () => {
    mainWindow = null;
  });

  // Set app theme based on system wide theme
  window.webContents.once('dom-ready', () =>
    window.webContents.send(
      'app.setTheme',
      systemPreferences.isDarkMode && systemPreferences.isDarkMode()
        ? 'dark'
        : 'light',
    ),
  );

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (!environmentService.mac) {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindowWithEvents when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});

if (environmentService.development) {
  import('electron-watch').then(({ default: watch }) =>
    watch(
      resolve(__dirname, '../../src/main'),
      'start:electron',
      resolve(__dirname, '../../'),
    ),
  );
}
