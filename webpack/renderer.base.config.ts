/* tslint:disable:object-literal-sort-keys */
/// <reference types="../typings" />
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  target: 'electron-renderer',
  entry: resolve(__dirname, '../src/renderer/components/shell/shell.component'),
  resolve: {
    alias: {
      '@store': resolve(__dirname, '../src/renderer/store/'),
      '@components': resolve(__dirname, '../src/renderer/components/'),
    },
    extensions: ['.scss', '.sass', '.css', '.ejs', '.html'],
  },
  externals: [
    (_, req, cb: any) => {
      if (/^@gadu\//gi.test(req)) {
        return cb(null, `commonjs ${req}`);
      }
      cb();
    },
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'to-lit-html-loader',
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
              includePaths: [
                'node_modules',
                'src/renderer/styles',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      // Assets
      {
        from: resolve(__dirname, '../src/renderer/assets'),
        to: 'assets',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
    }),
  ],
});

export default config;
