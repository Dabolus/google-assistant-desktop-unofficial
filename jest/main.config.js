module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  transform: {
    '.+\\.[tj]s$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '@services/(.*)': '<rootDir>/src/main/services/$1',
    '@helpers/(.*)': '<rootDir>/src/main/helpers/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/src/main/**/*.spec.ts'],
};
