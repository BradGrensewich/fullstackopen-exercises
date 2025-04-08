const { describe, beforeEach, test, expect } = require('@playwright/test');
const { login } = require('./helpers');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173');
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'username',
        password: 'password',
        name: 'Brad',
      },
    });
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login to application')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      login(page, 'username', 'password');
      await expect(page.getByText('Brad logged in')).toBeVisible();
    });

    test.only('fails with wrong password', async ({ page }) => {
      login(page, 'username', 'wrong');
      await expect(page.getByText('Brad logged in')).not.toBeVisible();
      await expect(page.getByText('Login failed')).toBeVisible();
    });
  });
});
