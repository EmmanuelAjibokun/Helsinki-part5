const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  beforeEach(async ({ page }) => {
    await apiContext.post('http://localhost:3003/api/testing/reset')
    await apiContext.post('http://localhost:3003/api/users', {
      data: {
        name: 'Big Manny',
        username: 'manny',
        password: 'password',
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('manny')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.getByText('manny logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('Unknown')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('manny')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button', {name: 'login'}).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create Blog' }).click()

      await page.getByLabel('Title').fill('My First Blog')
      await page.getByLabel('Author').fill('Big Manny')
      await page.getByLabel('Url').fill('http://example.com/my-first-blog')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('My First Blog')).toBeVisible()
    })
  })

  describe('Blog can be liked', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('manny')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button', {name: 'login'}).click()

      await page.getByRole('button', { name: 'Create Blog' }).click()
      await page.getByLabel('Title').fill('Blog to Like')
      await page.getByLabel('Author').fill('Big Manny')
      await page.getByLabel('Url').fill('http://example.com/blog-to-like')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('a user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()

      await page.getByRole('button', { name: 'Like' }).click()

      await expect(page.getByText('1')).toBeVisible()
    })
  })
})