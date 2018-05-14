const { resolve } = require('path');
const browserSync = require('browser-sync');

browserSync({
  server: resolve(__dirname, '../dev'),
  port: 9000,
  ui: {
    port: 9001,
  },
  open: false,
});

module.exports = [
  require('./main/dev.config'),
  require('./renderer/dev.config'),
];
