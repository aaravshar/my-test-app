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
  // ✅ Critical: data is a JS array (list), NOT a dict — arrays have `.length`, not `.items()`  
  //    (Python dicts have `.items()`, but this is JavaScript → JSON arrays stay as arrays)
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(1);
  expect(data[0]).toMatchObject({ id: expect.any(String), title: 'Buy milk', done: false });

  // 🔒 NEVER do: data.items() — will throw TypeError: data.items is not a function
});
