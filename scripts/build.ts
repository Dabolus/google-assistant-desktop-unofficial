// tslint:disable:no-console

import { build, CliOptions, Configuration, Platform } from 'electron-builder';

const getConfig = (platform: string): CliOptions => {
  const baseConfig: Configuration = {
    appId: 'app.dabolus.google-assistant-desktop-unofficial',
    productName: 'Google Assistant',
    files: [
      '**/*.{js,html,css}',
      'assets/**/*',
    ],
  };

  switch (platform) {
    case 'win32':
      return {
        targets: Platform.WINDOWS.createTarget(),
        config: {
          ...baseConfig,
          win: {
            target: ['nsis', 'msi'],
          },
        },
      };
    case 'linux':
      return {
        targets: Platform.LINUX.createTarget(),
        config: {
          ...baseConfig,
          linux: {
            target: [
              'deb',
              'rpm',
              'snap',
              'AppImage',
            ],
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
            target: 'default',
            darkModeSupport: true,
          },
          dmg: {
            contents: [
              {
                x: 130,
                y: 220,
              },
              {
                x: 410,
                y: 220,
                type: 'link',
                path: '/Applications',
              },
            ],
          },
        },
      };
    default:
      throw new Error(`${platform} is not supported`);
  }
};

const [, , p = process.platform] = process.argv;

build(getConfig(p))
  .then(() => {
    console.log('Build successful');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(`Error during build: ${e.message}`);
    process.exit(1);
  });
