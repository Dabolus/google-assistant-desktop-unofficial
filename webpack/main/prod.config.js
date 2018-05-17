const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { smart: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = smartMerge(baseConfig, {
  mode: 'development',
  // TODO check why production mode isn't working
  // mode: 'production',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: resolve(__dirname, '../../dist'),
  },
  plugins: [
    new DefinePlugin({
      NODE_ENV: 'production',
    }),
  ],
});
