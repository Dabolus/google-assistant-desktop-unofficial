import { BrowserWindowWithEvents } from '@helpers/events.helper';
import { app, systemPreferences } from 'electron';
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

function createMainWindow() {
  const window = new BrowserWindowWithEvents({
    center: true,
    minWidth: 360,
    minHeight: 540,
  });

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
