module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  // "collectCoverage": true,
  // "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"],
}
