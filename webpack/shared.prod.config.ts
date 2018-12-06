/* tslint:disable:object-literal-sort-keys */
/// <reference types="../typings" />
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import sharedBaseConfig from './shared.base.config';

const config: Configuration = smartMerge(sharedBaseConfig, {
  mode: 'production',
  output: {
    filename: 'shared.js',
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
