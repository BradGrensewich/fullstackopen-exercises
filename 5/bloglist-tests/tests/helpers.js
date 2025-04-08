const login = async (page, username, password) => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.getByRole('button', { name: 'login' }).click();
}

module.exports = {login}