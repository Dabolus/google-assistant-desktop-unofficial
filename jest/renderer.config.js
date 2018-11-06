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
    '@components/(.*)': '<rootDir>/src/renderer/components/$1',
    '@actions/(.*)': '<rootDir>/src/renderer/actions/$1',
    '@reducers/(.*)': '<rootDir>/src/renderer/reducers/$1',
    '@store': '<rootDir>/src/renderer/store',
  },
  moduleFileExtensions: ['ts', 'js', 'scss', 'sass', 'css', 'ejs', 'html'],
  testMatch: [
    '<rootDir>/src/renderer/**/*.spec.ts',
  ],
};
