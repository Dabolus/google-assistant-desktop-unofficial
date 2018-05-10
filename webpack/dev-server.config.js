const {resolve} = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  content: resolve(__dirname, '../dev'),
  hot: true,
  port: 9999,
  // http2: config.devServer.useHTTP2,
  dev: {
    publicPath: 'http://localhost:9999/',
  },
  add: (app) => {
    // History API Fallback
    app.use(convert(history()));
  },
};
