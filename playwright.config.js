```javascript
// @ts-check
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests/public',
  timeout: 30000,
  retries: 1,

  // ✅ SAFE REPORTERS ONLY:
  //   - 'line' for humans (no raw structured data)
  //   - 'html' for exploratory review
  //   - 'blob' for reliable machine parsing (binary, no .items() risk)
  // ❌ NO 'junit' — avoids XML → object mapping errors
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['blob']
  ],

  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // No console.* in tests — prevents accidental stringified lists in system-out
  },

  webServer: {
    command: 'cd src && python app.py',
    url: 'http://localhost:5000/',
    reuseExistingServer: true,
    timeout: 60000,
    env: {
      FLASK_APP: 'app.py',
      FLASK_ENV: 'test'
    }
  },

  // 🔒 Pre-run cleanup (remove stale test artifacts)
 globalSetup: require.resolve('./scripts/cleanup-artifacts.js')
});
// ✅ SUMMARY:
// - Starts Flask app on :5000 reliably (`cd src && python app.py`)
// - No `junit.xml`, no JSON logs → avoids `.items()` errors
// - Safe reporters → Playwright CI-friendly output
```
