import {app} from 'electron';

import {createShortcuts, updateShortcuts, removeShortcuts} from './shortcut-manager';

const handleStartupEvent = () => {
  if (process.platform !== 'win32') {
    return false;
  }

  for (const arg of process.argv) {
    switch (arg) {
      case '--squirrel-install':
        createShortcuts();
        app.quit();
        return true;
      case '--squirrel-updated':
        updateShortcuts();
        app.quit();
        return true;
      case '--squirrel-uninstall':
        removeShortcuts();
        app.quit();
        return true;
      case '--squirrel-obsolete':
        app.quit();
        return true;
      default:
        break;
    }
  }
  return false;
};

export default handleStartupEvent;
