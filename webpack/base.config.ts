/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  cache: true,
  context: resolve(__dirname, '..'),
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../src/renderer/components/'),
      '@actions': resolve(__dirname, '../src/renderer/actions/'),
      '@reducers': resolve(__dirname, '../src/renderer/reducers/'),
      '@store$': resolve(__dirname, '../src/renderer/store.ts'),
    },
    extensions: ['.ts', '.js', '.scss', '.css', '.ejs'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/env', {
                loose: true,
                modules: false,
                useBuiltIns: 'usage',
              }],
              '@babel/typescript',
            ],
            plugins: [
              ['@babel/transform-runtime', {
                corejs: 2,
                sourceType: 'unambiguous',
              }],
              ['@babel/proposal-decorators', {
                legacy: true,
              }],
              ['@babel/proposal-class-properties', {
                loose: true,
              }],
            ],
          },
        },
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};

export default config;
