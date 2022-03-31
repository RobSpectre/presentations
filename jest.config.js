module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    './tests/setupTests.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  globals: {
    'vue-jest': {
      pug: {
        doctype: 'html'
      }
    }
  }
}
