```javascript
// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ request }) => {
  // Ensure clean state before each test to avoid test pollution & .items() misinterpretation
  await request.get('/reset');
});

test('should load todos and display stats', async ({ page, request }) => {
  // Verify reset worked: /api/todos should be empty
  const resetCheck = await request.get('/api/todos');
  expect(resetCheck.status()).toBe(200);
  const initialData = await resetCheck.json();
  expect(Array.isArray(initialData)).toBe(true);
  expect(initialData.length).toBe(0);

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

test('should add multiple todos independently', async ({ page, request }) => {
  await request.get('/reset');

  await page.goto('/');
  await expect(page.getByTestId('stats')).toContainText('Total: 0');

  await page.getByTestId('todo-input').fill('Todo 1');
  await page.getByTestId('add-button').click();
  await page.waitForSelector('.todo-item');

  await page.getByTestId('todo-input').fill('Todo 2');
  await page.getByTestId('add-button').click();
  await page.waitForSelector('.todo-item:nth-child(2)');

  // Confirm two items
  await expect(page.getByTestId('todo-list')).toHaveCount(2);
  await expect(page.getByTestId('stats')).toContainText('Total: 2');

  // Verify /api/todos remains clean array (no .items())
  const apiRes = await page.goto('/api/todos');
  const resBody = await apiRes.json();
  expect(Array.isArray(resBody), '/api/todos should still be a list').toBe(true);
  expect(typeof resBody.items).toBe('undefined');
  expect(resBody.length).toBe(2);
});
```
