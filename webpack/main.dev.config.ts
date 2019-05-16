import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import mainBaseConfig from './main.base.config';

const config: Configuration = smartMerge(mainBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'main.js',
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
