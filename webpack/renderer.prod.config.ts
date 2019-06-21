/// <reference types="../typings" />
import HtmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import rendererBaseConfig from './renderer.base.config';

const config: Configuration = smartMerge(rendererBaseConfig, {
  mode: 'production',
  output: {
    filename: 'renderer.js',
    path: resolve(__dirname, '../app'),
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: 'all',
        terserOptions: {
          compress: {
            drop_console: true, // eslint-disable-line @typescript-eslint/camelcase
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/renderer/index.ejs',
    }),
  ],
});

export default config;
