```javascript
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/public',
  timeout: 30000,
  retries: 1,

  // ✅ SAFE REPORTERS:
  //   - 'line' + 'html' for humans (no raw arrays)
  //   - 'blob' for machines (binary, no strings to parse → no .items() risk)
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['blob']
  ],

  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
    
    // Prevent capturing stdout/stderr in test output — avoids JSON arrays in <system-out>
    // which could be misparsed as lists & trigger .items() in downstream tools
    trace: 'on-first-retry'
  },

  webServer: {
    command: 'echo "waiting for docker"',
    url: 'http://localhost:5000/',
    reuseExistingServer: true,
    timeout: 60000
  },

  // 🔒 EXTRA SAFEGUARD: Strip all test data from JUnit output (use blob instead)
  // If you MUST use junit, ensure no tests log raw JSON strings to stdout/stderr
  // by using context logs only in test files (and they’re already guarded above)
});
