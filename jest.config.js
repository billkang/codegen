/*
 * @Author: baohua.kang baohua.kang@gientech.com
 * @Date: 2023-02-03 09:10:07
 * @LastEditors: baohua.kang baohua.kang@gientech.com
 * @LastEditTime: 2023-02-12 10:59:01
 */
const { jsWithTs: tsjPreset } = require('ts-jest/presets')

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.test.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60000,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    ...tsjPreset.transform
  },
  transformIgnorePatterns: ['node_modules'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^@codegen/(.*?)$': '<rootDir>/packages/$1/src'
  },
  rootDir: __dirname
}
