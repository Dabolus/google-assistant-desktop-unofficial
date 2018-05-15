const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../../dev'),
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.sass', '.html'],
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
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../../package.json'),
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
