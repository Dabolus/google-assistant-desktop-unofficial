module.exports = {
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
    '@babel/syntax-dynamic-import',
  ],
};
