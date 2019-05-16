/* eslint-disable no-console */

import FormData from 'form-data';
import { createReadStream } from 'fs';
import fetch from 'node-fetch';
import { resolve } from 'path';
import { version } from '../package.json';

const getPaths = (platform: string): string[] => {
  switch (platform) {
    case 'win32':
      return [resolve(__dirname, `../app/dist/Google Assistant Setup ${version}.exe`)];
    case 'linux':
      return [
        resolve(__dirname, `../app/dist/google-assistant-desktop-unofficial_${version}_amd64.deb`),
        resolve(__dirname, `../app/dist/google-assistant-desktop-unofficial-${version}.x86_64.rpm`),
        resolve(__dirname, `../app/dist/google-assistant-desktop-unofficial_${version}_amd64.snap`),
        resolve(__dirname, `../app/dist/Google Assistant ${version}.AppImage`),
      ];
    case 'darwin':
      return [
        resolve(__dirname, `../app/dist/Google Assistant-${version}.dmg`),
        resolve(__dirname, `../app/dist/Google Assistant-${version}-mac.zip`),
      ];
    default:
      throw new Error(`${platform} is not supported`);
  }
};

const [, , p = process.platform] = process.argv;

const body = new FormData();
body.append('platform', p);
getPaths(p).forEach((path, i) =>
  body.append(`file.${i}`, createReadStream(path)));

fetch(process.env.UPLOAD_ENDPOINT, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${process.env.UPLOAD_TOKEN}`,
  },
  body,
})
  .then(() => {
    console.log('Upload successful');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(`Error during upload: ${e.message}`);
    process.exit(1);
  });
