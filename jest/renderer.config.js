module.exports = {
  rootDir: '..',
  testEnvironment: '@skatejs/ssr/jest',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules\\/(?!(@polymer|lit-html|lit-element|pwa-helpers)).*/',
  ],
  moduleNameMapper: {
    '.+\\.styles': '<rootDir>/src/renderer/__mocks__/styles.mock.ts',
    '@store/(.*)': '<rootDir>/src/renderer/store/$1',
    '@components/(.*)': '<rootDir>/src/renderer/components/$1',
    '@services/(.*)': '<rootDir>/src/renderer/services/$1',
    '@helpers/(.*)': '<rootDir>/src/renderer/helpers/$1',
    '@locales/(.*)': '<rootDir>/src/renderer/locales/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'scss', 'sass', 'css', 'ejs', 'html'],
  testMatch: [
    '<rootDir>/src/renderer/**/*.spec.ts',
  ],
};
