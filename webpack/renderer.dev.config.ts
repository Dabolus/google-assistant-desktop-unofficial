/* tslint:disable:object-literal-sort-keys */
import HtmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'eval-source-map',
  entry: resolve(__dirname, '../src/renderer/index'),
  output: {
    filename: 'renderer.js',
    path: resolve(__dirname, '../node_modules/.build'),
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/renderer/index.ejs',
      showErrors: true,
    }),
  ],
});

export default config;
