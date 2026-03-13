```javascript
const { test, expect } = require('@playwright/test');

test.describe('Todo App', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5000');
  });

  test('add a new todo', async ({ page }) => {
    // Fill in the todo title
    await page.fill('[data-testid="todo-input"]', 'New Todo Item');
    // Add the todo
    await page.click('[data-testid="add-button"]');
    // Check that the new todo appears in the list
    const todoTitle = await page.innerText('[data-testid="todo-title"]');
    expect(todoTitle).toBe('New Todo Item');
  });

  test('toggle the completion status of a todo', async ({ page }) => {
    // Add a todo to toggle
    await page.fill('[data-testid="todo-input"]', 'Toggle Todo Item');
    await page.click('[data-testid="add-button"]');
    // Toggle the completion status
    await page.click('[data-testid="toggle-button"]');
    // Check that the todo is marked as done
    await page.isVisible('[data-testid="todo-item"].done');
  });

  test('delete a todo item', async ({ page }) => {
    // Add a todo to delete
    await page.fill('[data-testid="todo-input"]', 'Delete Todo Item');
    await page.click('[data-testid="add-button"]');
    // Delete the todo
    await page.click('[data-testid="delete-button"]');
    // Check that the todo list is empty
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(0);
  });
});
```
