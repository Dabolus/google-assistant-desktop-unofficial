/* tslint:disable:object-literal-sort-keys */
/// <reference types="../typings" />
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  mode: 'production',
  target: 'electron-main',
  entry: resolve(__dirname, '../src/main/index'),
  output: {
    filename: 'main.js',
    path: resolve(__dirname, '../app'),
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
    ],
  },
});

export default config;
