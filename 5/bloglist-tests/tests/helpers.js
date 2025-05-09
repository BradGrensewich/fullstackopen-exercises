const login = async (page, username, password) => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByTestId('notification').waitFor();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await page.getByPlaceholder('title').fill(title);
  await page.getByPlaceholder('author').fill(author);
  await page.getByPlaceholder('url').fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByTestId('blog').getByText(title).waitFor()
};

module.exports = { login, createBlog };
