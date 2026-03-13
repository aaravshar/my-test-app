```javascript
const { test, expect } = require('@playwright/test');

test('should display the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Todo App/);
});

test('should add a new todo item', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[data-testid="todo-input"]', 'New Todo');
  await page.click('button[data-testid="add-button"]');
  const todoTitle = await page.locator('li.todo-item span.todo-title').last();
  await expect(todoTitle).toHaveText('New Todo');
});
