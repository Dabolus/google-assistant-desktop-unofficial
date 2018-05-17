const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { readFileSync } = require('fs');
// For some reason, babel-loader isn't automatic<ally getting options from .babelrc,
// so we read them and inject them into the loader manually.
// (for some other reason, directly requiring the .babelrc file isn't working either,
//  probably because of the lack of the .json extension)
const babelConf = JSON.parse(readFileSync(resolve(__dirname, '../../.babelrc')).toString());

module.exports = {
  target: 'electron-renderer',
  entry: {
    renderer: resolve(__dirname, '../../src/renderer'),
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.sass', '.html'],
    alias: {
      '~': resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: babelConf,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
  ],
};
