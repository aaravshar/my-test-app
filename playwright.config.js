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
    command: 'docker-compose -f src/docker-compose.yml up',
    url: 'http://localhost:5000/',
    reuseExistingServer: false,
    timeout: 120000,
  },
  metadata: {
    task: {
      test_case_config: {
        exampleSetting: true,             // Example setting
        timeoutMultiplier: 2,             // Adjusts the global timeout
        retryStrategy: 'on-failure',      // Retry tests on failure
        allowedFailure: false,            // Disallow tests to fail without affecting success
        logLevel: 'info',                 // Log verbosity level
        additionalConfig: 'specific-value'// Custom configuration field
        // Ensure all necessary fields are included and configured correctly
      },
    },
  },
});
```
