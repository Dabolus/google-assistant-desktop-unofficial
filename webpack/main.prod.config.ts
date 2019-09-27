/// <reference types="../typings" />
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import mainBaseConfig from './main.base.config';

const config: Configuration = smartMerge(mainBaseConfig, {
  mode: 'production',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, '../app'),
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        terserOptions: {
          compress: {
            drop_console: true, // eslint-disable-line @typescript-eslint/camelcase
          },
        },
      }),
    ],
  },
});

export default config;
