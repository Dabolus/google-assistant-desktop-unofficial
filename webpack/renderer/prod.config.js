const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { smart: smartMerge } = require('webpack-merge');
const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');
const baseConfig = require('./base.config');

const sassConfig = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        ctx: {
          production: true,
        },
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [
        resolve(__dirname, '../../node_modules'),
      ],
    },
  },
];

module.exports = smartMerge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../../dist'),
  },
  // We need to provide our own UglifyJS plugin to provide a custom configuration
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
    ],
    splitChunks: {
      // TODO: Checkout why this option isn't working.
      // The default value is 'async', but setting it to 'all' is suggested.
      chunks: 'all',
      name: false,
    },
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
    new DefinePlugin({
      NODE_ENV: 'production',
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
      hash: true,
      inject: true,
      template: resolve(__dirname, '../../src/index.html'),
    }),
  ],
});
