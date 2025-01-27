const { defaults } = require('jest-config');

module.exports = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  globals: {},
  testMatch: ['<rootDir>/**/?(*.)test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        babel: false,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage/cdk',
  coverageReporters: ['text', 'json', 'json-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
