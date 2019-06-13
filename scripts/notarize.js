/* eslint-disable @typescript-eslint/no-var-requires */
const { notarize } = require('electron-notarize');
const { appId } = require('../electron-builder.json');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = context => {
  const { electronPlatformName, appOutDir, packager } = context;
  const appName = packager.appInfo.productFilename;

  if (
    electronPlatformName !== 'darwin' ||
    !process.env.APPLE_ID ||
    !process.env.APPLE_ID_PASS
  ) {
    return;
  }

  return notarize({
    appBundleId: appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  });
};
