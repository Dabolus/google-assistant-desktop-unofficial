const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const devServerConfig = require('./dev-server.config');
const { smart: smartMerge } = require('webpack-merge');
const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');
const baseConfig = require('./base.config');

const sassConfig = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  /* {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: {
        ctx: {
          production: false,
        },
      },
    },
  }, */
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [
        resolve(__dirname, '../../node_modules'),
      ],
    },
  },
];

module.exports = smartMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../../dev'),
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /components/,
        use: [
          {
            loader: MiniCssExtractLoader,
          },
          ...sassConfig,
        ],
      },
      {
        test: /components.*\.s?[ac]ss$/,
        use: [
          {
            loader: 'to-string-loader',
          },
          ...sassConfig,
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: resolve(__dirname, '../../src/index.html'),
    }),
  ],
});
