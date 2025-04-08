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
      await login(page, 'username', 'password');
      await expect(page.getByText('Brad logged in')).toBeVisible();
    });

    test('fails with wrong password', async ({ page }) => {
      await login(page, 'username', 'wrong');
      await expect(page.getByText('Brad logged in')).not.toBeVisible();
      await expect(page.getByText('Login failed')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'username', 'password');
    });

    test.only('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click();
      await page.getByPlaceholder('title').fill('new blog');
      await page.getByPlaceholder('author').fill('brad');
      await page.getByPlaceholder('url').fill('www.fake.com');
      await page.getByRole('button', { name: 'create' }).click();

      const blog = await page.getByTestId('blog')
      await expect(blog.getByText('new blog')).toBeVisible();
    });
  });
});
