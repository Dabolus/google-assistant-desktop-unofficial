/* tslint:disable:object-literal-sort-keys */
import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  cache: true,
  context: resolve(__dirname, '..'),
  resolve: {
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
                useBuiltIns: 'usage',
              }],
              '@babel/typescript',
            ],
            plugins: [
              ['@babel/transform-runtime', {
                corejs: 2,
                sourceType: 'unambiguous',
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
