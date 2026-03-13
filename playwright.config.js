```javascript
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/public',
  timeout: 30000,
  retries: 1,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'junit.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
  },
  webServer: {
    command: 'docker-compose up --build', // Changed to actually run docker-compose
    url: 'http://localhost:5000/',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
