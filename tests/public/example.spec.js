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

// Suppose the interaction is API-based with an assumed flow, ensuring it starts with a user message
test('should start conversation with user message', async ({ page }) => {
  await page.goto('/');
  
  // Simulating starting a conversation with a user message
  const response = await page.evaluate(async () => {
    const userMessage = { input: "Hello", userId: "user-1" };
    const res = await fetch('/api/start-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userMessage),
    });
    return res.json();
  });

  expect(response.status).toBe('success');
});
```
