module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        useBuiltIns: 'usage',
        corejs: 3,
        ...(process.env.NODE_ENV === 'test'
          ? {}
          : {
              modules: false,
            }),
      },
    ],
    '@babel/typescript',
  ],
  plugins: [
    [
      'template-html-minifier',
      {
        modules: {
          'lit-html': ['html', 'svg'], // lit-html
          'lit-element': ['html', 'svg'], // lit-element
          '@polymer/polymer/polymer-element': ['html'], // Polymer 3 - exported from Polymer Element
          '@polymer/polymer/lib/utils/html-tag.js': ['html'], // Polymer 3 - exported from utils (used by PolymerElements family)
        },
        htmlMinifier: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
        },
      },
    ],
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
        sourceType: 'unambiguous',
      },
    ],
    [
      '@babel/proposal-decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    [
      '@babel/proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/syntax-dynamic-import',
    '@babel/proposal-optional-chaining',
    'macros',
  ],
};
