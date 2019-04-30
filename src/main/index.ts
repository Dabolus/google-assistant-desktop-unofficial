import { BrowserWindowWithEvents } from '@helpers/events.helper';
import { app, Menu, shell, systemPreferences } from 'electron';
import { resolve } from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindowWithEvents | null;

async function configureDevTools(window: BrowserWindowWithEvents) {
  const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
  await installExtension(REDUX_DEVTOOLS);
  window.webContents.openDevTools();
}

function createMenu(window: BrowserWindowWithEvents) {
  const menu = Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{
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
    }] as any : []),
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
          click: () => shell.openExternal('https://github.com/Dabolus/google-assistant-desktop-unofficial'),
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
  });
  createMenu(window);

  if (isDevelopment) {
    window.loadURL(`http://localhost:8080`);
    configureDevTools(window);
  } else {
    window.loadURL(formatUrl({
      pathname: resolve(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  // Set app theme based on system wide theme
  window.webContents.once('dom-ready', () =>
    window.webContents.send(
      'app.setTheme',
      systemPreferences.isDarkMode() ? 'dark' : 'light',
    ),
  );

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
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

if (isDevelopment) {
  import('electron-watch')
    .then(({ default: watch }) => watch(
      resolve(__dirname, '../../src/main'),
      'start:electron',
      resolve(__dirname, '../../'),
    ));
}
