import HtmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { smart as smartMerge } from 'webpack-merge';
import rendererBaseConfig from './renderer.base.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = smartMerge(rendererBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    overlay: true,
    port: parseInt(process.env.PORT, 10) || 8080,
  },
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
