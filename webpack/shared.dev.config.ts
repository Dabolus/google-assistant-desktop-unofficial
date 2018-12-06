/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import sharedBaseConfig from './shared.base.config';

const config: Configuration = smartMerge(sharedBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'shared.js',
    path: resolve(__dirname, '../node_modules/.build'),
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});

export default config;
