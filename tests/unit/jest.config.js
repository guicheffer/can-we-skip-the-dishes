const config = require('./package.json').config

const defaultPathsToIgnore = ['node_modules']

module.exports = {
  coverageDirectory: '<rootDir>/reports/coverage/app/',
  coveragePathIgnorePatterns: defaultPathsToIgnore,
  moduleFileExtensions: ['js'],
  roots: config.path.unitTests,
  testPathIgnorePatterns: defaultPathsToIgnore,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
}
