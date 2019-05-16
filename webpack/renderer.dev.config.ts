import HtmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { smart as smartMerge } from 'webpack-merge';
import rendererBaseConfig from './renderer.base.config';

const config: Configuration = smartMerge(rendererBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'renderer.js',
    path: resolve(__dirname, '../node_modules/.build'),
    pathinfo: false,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new HtmlPlugin({
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/renderer/index.ejs',
      showErrors: true,
    }),
  ],
});

export default config;
