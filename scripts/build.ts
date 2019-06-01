/* eslint-disable no-console */

import { build, CliOptions, Configuration, Platform } from 'electron-builder';
import { copy } from 'fs-extra';
import { resolve } from 'path';

const getConfig = (platform: string): CliOptions => {
  const baseConfig: Configuration = {
    appId: 'app.dabolus.google-assistant-desktop-unofficial',
    productName: 'Google Assistant',
    files: ['**/*.{js,html,css}', 'assets/**/*'],
  };

  switch (platform) {
    case 'win32':
      return {
        targets: Platform.WINDOWS.createTarget(),
        config: {
          ...baseConfig,
          win: {
            target: 'nsis',
          },
        },
      };
    case 'linux':
      return {
        targets: Platform.LINUX.createTarget(),
        config: {
          ...baseConfig,
          linux: {
            category: 'Utility',
            target: ['deb', 'rpm', 'snap', 'AppImage'],
          },
        },
      };
    case 'darwin':
      return {
        targets: Platform.MAC.createTarget(),
        config: {
          ...baseConfig,
          mac: {
            category: 'public.app-category.utilities',
            target: ['dmg', 'zip'],
            darkModeSupport: true,
          },
        },
      };
    default:
      throw new Error(`${platform} is not supported`);
  }
};

const [, , p = process.platform] = process.argv;

// Make sure we are in the app directory
process.chdir(resolve(__dirname, '../app'));

Promise.all([
  copy('../package.json', './package.json'),
  copy('../src/resources', './build'),
])
  .then(() => build(getConfig(p)))
  .then(() => {
    console.log('Build successful');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(`Error during build: ${e.message}`);
    process.exit(1);
  });
