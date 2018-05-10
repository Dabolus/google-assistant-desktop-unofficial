const {resolve} = require('path');

module.exports = {
  target: 'electron-main',
  entry: {
    main: resolve(__dirname, '../../src/main'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: resolve(__dirname, '../../dev'),
  },
  resolve: {
    extensions: ['.js'],
  },
};
