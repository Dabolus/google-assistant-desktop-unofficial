const { resolve } = require('path');
const { smart: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = smartMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: resolve(__dirname, '../../dev'),
  },
});
