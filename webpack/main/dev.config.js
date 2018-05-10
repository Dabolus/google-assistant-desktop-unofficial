const {smart: smartMerge} = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = smartMerge(baseConfig, {
  mode: 'development',
});
