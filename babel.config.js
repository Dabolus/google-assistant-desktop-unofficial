module.exports = {
  presets: [
    ['@babel/env', {
      loose: true,
      useBuiltIns: 'usage',
      ...process.env.NODE_ENV === 'test' ? {} : {
        modules: false,
      },
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
