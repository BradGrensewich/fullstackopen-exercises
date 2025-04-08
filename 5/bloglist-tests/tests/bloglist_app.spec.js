const { describe, beforeEach, test, expect } = require('@playwright/test');
const { login, createBlog } = require('./helpers');
const { request } = require('http');

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

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url');
      const blog = await page.getByTestId('blog');
      await expect(blog.getByText('test title')).toBeVisible();
    });

    describe('and a blog has been created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test url');
      });

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click();
        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('likes: 1')).toBeVisible();
      });

      test('it can be deleted by its owner', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click();
        await page.getByRole('button', { name: 'remove' }).click();

        await expect(page.getByText('blog deleted')).toBeVisible();
        await expect(page.getByText('test title')).not.toBeVisible();
      });

      test.only('it cant be deleted by a second user', async ({
        page,
        request,
      }) => {
        await request.post('http://localhost:3001/api/users', {
          data: {
            username: 'user2',
            password: 'password',
            name: 'User2',
          },
        });
        await page.getByRole('button', { name: 'Logout' }).click();
        await login(page, 'user2', 'password');
        await page.getByRole('button', { name: 'show' }).click();

        await expect(page.getByText('test url')).toBeVisible();
        await expect(
          page.getByRole('button', { name: 'delete' }),
        ).not.toBeVisible();
      });
    });
  });
});
