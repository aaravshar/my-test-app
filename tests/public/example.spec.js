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

  // ✅ SAFEGUARD: /api/todos returns a *JSON array* → must use array methods (e.g., .length)
  // JavaScript arrays do *not* have `.items()` — that's a Python dict method.
  // Unintended `.items()` calls will throw "data.items is not a function"
  expect(Array.isArray(data), 'Expected /api/todos to return a JSON array').toBe(true);

  // 🔒 Explicitly verify that `.items()` is NOT present on the response: prevents regression
  expect(typeof data.items, 'Expected JS array to lack .items() (Python-only method)').toBe('undefined');

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
```
