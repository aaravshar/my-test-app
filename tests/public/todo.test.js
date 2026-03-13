const { test, expect } = require('@playwright/test');

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('add a new todo', async ({ page }) => {
    await page.fill('[data-testid="todo-input"]', 'New Todo Item');
    await page.click('[data-testid="add-button"]');
    const todoTitle = await page.locator('[data-testid="todo-title"]').first();
    await expect(todoTitle).toHaveText('New Todo Item');
  });

  test('toggle the completion status of a todo', async ({ page }) => {
    await page.fill('[data-testid="todo-input"]', 'Toggle Todo Item');
    await page.click('[data-testid="add-button"]');
    const toggleButton = await page.locator('[data-testid="toggle-button"]').first();
    await toggleButton.click();
    const todoItem = await page.locator('[data-testid="todo-item"].done').first();
    await expect(todoItem).toBeVisible();
  });

  test('delete a todo item', async ({ page }) => {
    await page.fill('[data-testid="todo-input"]', 'Delete Todo Item');
    await page.click('[data-testid="add-button"]');
    const deleteButton = await page.locator('[data-testid="delete-button"]').first();
    await deleteButton.click();
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
  });
});
//
