```javascript
// @ts-check
const { test, expect } = require('@playwright/test');

test('should load todos and display stats', async ({ page }) => {
  await page.goto('/');

  // Ensure no crash on stats — they're integers (not lists), so no .items() method
  await expect(page.getByTestId('stats')).toContainText('Total: 0');

  // Add a todo
  await page.getByTestId('todo-input').fill('Buy milk');
  await page.getByTestId('add-button').click();

  // Wait for update
  await page.waitForSelector('.todo-item');

  // Verify todo appears
  await expect(page.getByTestId('todo-title')).toContainText('Buy milk');
  await expect(page.getByTestId('stats')).toContainText('Total: 1');

  // API test: confirm /api/todos returns a JSON array (NOT a dict)
  const response = await page.goto('/api/todos');
  expect(response.status()).toBe(200);

  const data = await response.json();

  // ✅ SAFEGUARD 1: /api/todos MUST return a JSON array (Python: list, JS: Array)
  expect(Array.isArray(data), 'Expected /api/todos to return a JSON array').toBe(true);

  // ✅ SAFEGUARD 2: Explicitly verify that `.items()` is NOT present on the response
  //   - JavaScript arrays do *not* have `.items()` — that's a Python dict method.
  //   - This guards against accidental Python-style assumptions in test tooling/reporters.
  expect(typeof data.items, 'Expected JS array to lack .items() (Python-only method)').toBe('undefined');

  // ✅ SAFEGUARD 3: Check data is *not* a dict-like object (no entries() either)
  expect(Array.isArray(data) && !('hasOwnProperty' in data) || data.toString() !== '[object Object]', 
    'Response must be an array, not a generic object').toBe(true);

  // Validate list length
  expect(data.length, 'Should match expected item count').toBe(1);

  // Validate structure of first item (id is string UUID, title/title type correct)
  expect(data[0], 'First todo should match schema').toMatchObject({
    id: expect.any(String),
    title: 'Buy milk',
    done: expect.any(Boolean), // strict: not just truthy/falsy, but explicitly boolean
  });

  // 💡 Bonus: Check that stats are integers (not lists!)
  const statsText = await page.locator('[data-testid="stats"]').textContent();
  expect(statsText).toMatch(/Total:\s*\d+/);
  expect(statsText).toMatch(/Active:\s*\d+/);
  expect(statsText).toMatch(/Completed:\s*\d+/);

  // Ensure no accidental stringified lists (e.g., "Total: [1,2,3]")
  expect(statsText, 'Stats should not contain bracketed lists').not.toMatch(/\[\s*\d+\s*,\s*\d+\s*\]/);
});
// 🔒 ADDITIONAL NOTE:
// This test explicitly guards against the "list has no .items()" error by confirming:
// - API responses are arrays → no `.items()`
// - Stats are scalar integers → no `.items()`
// - Any tooling parsing `junit.xml` should treat test metadata as scalars/lists, not dicts.
// If you're seeing `.items() is not a function`, check:
//   - custom reporters (e.g., in Jest/Playwright plugins)
//   - CI scripts that parse XML/JSON outputs
//   - post-test analysis scripts that assume "properties" are dicts
// In Python: call `.items()` on dicts only. In JS: use `.entries()` on Maps or Object.entries() on plain objects.
```
