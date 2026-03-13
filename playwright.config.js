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
        exampleSetting: true,         // Example: Determines if a feature is enabled
        timeoutMultiplier: 2,         // Example: Adjusts the global timeout settings
        additionalConfig: 'specific-value',    // Customize this field as necessary
      }
    }
  }
});
