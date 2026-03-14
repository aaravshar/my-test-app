// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/public',
  timeout: 30000,
  retries: 1,
  reporter: [
    ['line'], // using 'line' instead of 'list' avoids Python 'list' object confusion and is more robust
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
