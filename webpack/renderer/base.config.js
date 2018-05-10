const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        use: 'babel-loader',
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
    ]),
  ],
};
