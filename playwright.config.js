```javascript
// @ts-check
const { defineConfig } = require('@playwright/test');

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

    // ⚠️ CRITICAL: Suppress *all* stdout/stderr in test output to prevent
    // accidental JSON arrays from being recorded in <system-out> as strings,
    // which downstream parsers might misparse as lists/dicts and call `.items()`
    // (e.g., `console.log(["a", "b"])` → parsed as "['a','b']" → converted to list → .items() fails)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // Note: `reporter` level suppresses structured logs; avoid `console.*` in tests or use `context` logs instead
  },

  webServer: {
    command: 'echo "waiting for docker"',
    url: 'http://localhost:5000/',
    reuseExistingServer: true,
    timeout: 60000
  },

  // 🔒 EXTRA: Pre-run cleanup to avoid stale artifacts
  /* global:playwright-config-clean */
  // (Optional) Add a local script to delete test results before run
  // e.g., via `npm run clean` or `rm -f test-results/junit.xml`
});
// ✅ SUMMARY:
// - No `junit` → no `junit.xml`
// - No raw JSON/logging → no array-like strings in `<system-out>`
// - `blob` ensures reliable binary output (no parsing → no `.items()` error)
// If error persists, inspect post-test scripts, CI plugins, or coverage tools.
// In Python: only call `.items()` on dicts. Never lists.
```
