/// <reference types="../typings" />
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig from './base.config';

const config: Configuration = smartMerge(baseConfig, {
  target: 'electron-renderer',
  entry: resolve(__dirname, '../src/renderer/components/shell/shell.component'),
  resolve: {
    alias: {
      '@store': resolve(__dirname, '../src/renderer/store/'),
      '@components': resolve(__dirname, '../src/renderer/components/'),
      '@services': resolve(__dirname, '../src/renderer/services/'),
      '@helpers': resolve(__dirname, '../src/renderer/helpers/'),
      '@locales': resolve(__dirname, '../src/locales/'),
    },
    extensions: ['.scss', '.sass', '.css', '.ejs', '.html'],
  },
  externals: [
    nodeExternals({
      importType: 'commonjs2',
      modulesFromFile: {
        include: ['dependencies'],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/to-lit-css-loader.ts'),
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
                require('autoprefixer')(),
                require('cssnano')({
                  preset: [
                    'advanced',
                    {
                      autoprefixer: false,
                    },
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['node_modules', 'src/renderer/styles'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      // Assets
      {
        from: resolve(__dirname, '../src/renderer/assets'),
        to: 'assets',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
    }),
  ],
});

export default config;
