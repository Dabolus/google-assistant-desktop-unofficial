const fs = require('fs/promises');
const {resolve} = require('path');
const {app} = require('electron');

/**
 * A class that allows to easily access to the application data,
 * with an interface base on browser's local/session storage.
 * TODO cache the settings to avoid too much I/O operations
 */
class SettingsStorage {
  static get STORAGE_NAME() {
    return 'settings.json';
  }

  static get STORAGE_DIR() {
    return app.getPath('userData');
  }

  static get STORAGE_PATH() {
    return resolve(this.STORAGE_DIR, this.STORAGE_NAME);
  }

  static key(number) {
    return fs.readFile(this.STORAGE_PATH)
      .then((data) => JSON.parse(data.toString()))
      .then((settings) => settings[Object.keys(settings)[number]])
      .catch(() => undefined);
  }

  static getItem(key) {
    return fs.readFile(this.STORAGE_PATH)
      .then((data) => JSON.parse(data.toString()))
      .then((settings) => settings[key])
      .catch(() => undefined);
  }

  static setItem(key, value) {
    return fs.readFile(this.STORAGE_PATH)
      .then((data) => JSON.parse(data.toString()))
      .catch(() => ({}))
      .then((settings) => ({
        ...settings,
        [key]: value,
      }))
      .then((updatedSettings) =>
        fs.writeFile(this.STORAGE_PATH, updatedSettings.toString()));
  }

  static removeItem(key) {
    return fs.readFile(this.STORAGE_PATH)
      .then((data) => JSON.parse(data.toString()))
      .then((settings) => {
        delete settings[key];
        return settings;
      })
      .then((updatedSettings) =>
        fs.writeFile(this.STORAGE_PATH, updatedSettings.toString()));
  }

  static clear() {
    return fs.unlink(this.STORAGE_PATH);
  }
}

export default SettingsStorage;
