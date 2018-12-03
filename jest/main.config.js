module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '@main-store': '<rootDir>/src/main/store',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '<rootDir>/src/main/**/*.spec.ts',
  ],
};
