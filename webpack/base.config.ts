/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  cache: true,
  context: resolve(__dirname, '..'),
  resolve: {
    alias: {
      '@shared': resolve(__dirname, '../src/shared/'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules\/(?!(pwa-helpers|@polymer)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
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
