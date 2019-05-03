/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  cache: true,
  output: {
    libraryTarget: 'commonjs2',
  },
  context: resolve(__dirname, '..'),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules\/(?!(@polymer|lit-html|lit-element|pwa-helpers)\/).*/,
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
