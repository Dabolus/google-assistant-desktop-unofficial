module.exports = {
  rootDir: '..',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/__mocks__/**/*',
  ],
  coverageDirectory: '<rootDir>/coverage',
  projects: [
    '<rootDir>/jest/main.config.js',
    '<rootDir>/jest/renderer.config.js',
  ],
};
