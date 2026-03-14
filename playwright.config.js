// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/public',
  timeout: 30000,
  retries: 1,
  // NOTE: Using 'line' reporter instead of 'list' to avoid confusion with Python's 'list' type
  //       (some tools/scripts might mistakenly try .items() on a list object)
  reporter: [
    ['line'],
    ['junit', { outputFile: 'junit.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
  },
  webServer: {
    command: 'echo "waiting for docker"',
    url: 'http://localhost:5000/',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
