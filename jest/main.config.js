module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {},
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: [
    '<rootDir>/src/main/**/*.spec.ts',
  ],
};
