/* tslint:disable:object-literal-sort-keys */
/// <reference types="../typings" />
// import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  plugins: [
    /* new CopyPlugin([
      // Assets
      {
        from: resolve(__dirname, '../src/assets'),
        to: '.',
      },
    ]), */
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
