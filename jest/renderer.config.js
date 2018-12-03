module.exports = {
  rootDir: '..',
  testEnvironment: '@skatejs/ssr/jest',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules\\/(?!(@polymer|lit-html|pwa-helpers)).*/',
  ],
  moduleNameMapper: {
    '.+\\.styles': '<rootDir>/src/renderer/__mocks__/styles.mock.ts',
    '@store/(.*)': '<rootDir>/src/store/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'scss', 'sass', 'css', 'ejs', 'html'],
  testMatch: [
    '<rootDir>/src/renderer/**/*.spec.ts',
  ],
};
