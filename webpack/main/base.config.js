const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'electron-main',
  entry: {
    main: resolve(__dirname, '../../src/main'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': resolve(__dirname, '../../src'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../../src/package.json'),
        to: '.',
      },
      {
        from: resolve(__dirname, '../../src/static'),
        to: './static',
      },
      {
        from: resolve(__dirname, '../../src/locales'),
        to: './locales',
      },
    ]),
  ],
};
