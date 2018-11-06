/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  target: 'electron-main',
  entry: resolve(__dirname, '../src/main/index'),
  resolve: {
    extensions: ['.json'],
  },
});

export default config;
