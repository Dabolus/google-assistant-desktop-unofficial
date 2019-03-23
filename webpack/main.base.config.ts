/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  target: 'electron-main',
  entry: resolve(__dirname, '../src/main/index'),
  resolve: {
    alias: {
      '@main-store$': resolve(__dirname, '../src/main/store.ts'),
    },
    extensions: ['.json'],
  },
  externals: [nodeExternals()],
});

export default config;
