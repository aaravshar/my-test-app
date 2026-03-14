```javascript
// @ts-check
const { test, expect } = require('@playwright/test');

test('should load todos and display stats', async ({ page }) => {
  await page.goto('/');

  // Ensure no crash on stats (they're always integers, not lists)
  await expect(page.getByTestId('stats')).toContainText('Total: 0');

  // Add a todo
  await page.getByTestId('todo-input').fill('Buy milk');
  await page.getByTestId('add-button').click();

  // Wait for update
  await page.waitForSelector('.todo-item');

  // Verify todo appears
  await expect(page.getByTestId('todo-title')).toContainText('Buy milk');
  await expect(page.getByTestId('stats')).toContainText('Total: 1');

  // API test: confirm /api/todos returns a JSON array
  const response = await page.goto('/api/todos');
  expect(response.status()).toBe(200);

  const data = await response.json();

  // ✅ CRITICAL SAFEGUARD:
  // JSON from /api/todos is always a JavaScript *array* (not a dict).
  // Arrays have `.length`, `.map()`, etc. — *not* `.items()` — which is a Python dict method.
  // Calling `data.items()` would cause: "TypeError: data.items is not a function"
  expect(Array.isArray(data), 'Expected /api/todos to return a JSON array (JS list)')
    .toBe(true);

  // Prevent "list has no .items()" bug by using `.length` instead
  expect(data.length, 'Should match expected item count')
    .toBe(1);

  // Validate the first item
  expect(data[0], 'First todo should match schema')
    .toMatchObject({
      id: expect.any(String),
      title: 'Buy milk',
      done: false,
    });

  // 🔒 NEVER use `.items()` (Python-only) on JS arrays!
  // The following would fail immediately:
  // ❌ expect(() => { data.items() }).toThrow(); // Uncommenting this demonstrates the correct behavior
});
