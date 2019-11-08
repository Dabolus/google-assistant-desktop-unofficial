import { container } from '@helpers/di.helper';
import { getBrowserWindowWithEvents } from '@helpers/events.helper';
import { Environment, EnvironmentService } from '@services/environment.service';
import { app, Menu, shell, nativeTheme, BrowserWindow } from 'electron';
import { resolve } from 'path';
import { format as formatUrl } from 'url';
import { autoUpdater } from 'electron-updater';

const environmentService: Environment = container.get(EnvironmentService);

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null;

async function configureDevTools(window: BrowserWindow) {
  const { default: installExtension, REDUX_DEVTOOLS } = await import(
    'electron-devtools-installer'
  );
  await installExtension(REDUX_DEVTOOLS);
  window.webContents.openDevTools();
}

function createMenu(window: BrowserWindow) {
  const menu = Menu.buildFromTemplate([
    ...(environmentService.mac
      ? ([
          {
            label: app.name,
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
        ...(process.env.NODE_ENV === 'development'
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
  const window = getBrowserWindowWithEvents({
    center: true,
    minWidth: 360,
    minHeight: 540,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  createMenu(window);
  const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';

  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:${process.env.PORT || '8080'}#${theme}`);
    configureDevTools(window);
  } else {
    window.loadURL(
      formatUrl({
        pathname: resolve(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
        hash: theme,
      }),
    );
  }

  window.once('closed', () => {
    mainWindow = null;
  });

  // Set app theme based on system wide theme
  window.webContents.once('dom-ready', () =>
    window.webContents.send('app.setTheme', theme),
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

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

if (process.env.NODE_ENV === 'development') {
  import('electron-watch').then(({ default: watch }) =>
    watch(
      resolve(__dirname, '../../src/main'),
      'start:electron',
      resolve(__dirname, '../../'),
    ),
  );
}
