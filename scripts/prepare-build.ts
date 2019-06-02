/* eslint-disable no-console */
import { copy } from 'fs-extra';
import { resolve } from 'path';

// Make sure we are in the app directory
process.chdir(resolve(__dirname, '../app'));

Promise.all([
  copy('../package.json', './package.json'),
  copy('../src/resources', './build'),
])
  .then(() => {
    console.log('Build preparation completed.');
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(`Error during build preparation: ${e.message}`);
    process.exit(1);
  });
