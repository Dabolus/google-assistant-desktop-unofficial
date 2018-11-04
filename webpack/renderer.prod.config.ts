/* tslint:disable:object-literal-sort-keys */
/// <reference types="../typings" />
import HtmlPlugin from 'html-webpack-plugin';
import { loader as miniCssExtractLoader } from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import rendererBaseConfig from './renderer.base.config';

const config: Configuration = smartMerge(rendererBaseConfig, {
  mode: 'production',
  target: 'electron-renderer',
  entry: resolve(__dirname, '../src/renderer/index'),
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
        extractComments: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          miniCssExtractLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
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
