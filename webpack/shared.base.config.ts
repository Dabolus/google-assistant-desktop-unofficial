/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  target: 'node',
  externals: [nodeExternals()],
  entry: resolve(__dirname, '../src/shared/index'),
  output: {
    library: 'shared',
    libraryTarget: 'commonjs2',
  },
});

export default config;
