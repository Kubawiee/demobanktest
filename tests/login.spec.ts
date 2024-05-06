import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page/login.page';

test.describe('User login to Ecomerce', () => {
  test.beforeEach('Before Each', async ({ page }) => {
    await page.goto('/');
  });
  const expectedUsername = loginData.expectedUsername;

  test('login with correct credentails', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('login with wrong to short login', async ({ page }) => {
    const userIncorrectLogin = 'login';
    const expectedErrorInccorectLogin = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userIncorrectLogin);
    await page.getByTestId('login-input').blur();

    // Assert
    await expect(loginPage.loginError).toHaveText(
      expectedErrorInccorectLogin,
    );
  });

  test('login with wrong too short password', async ({ page }) => {
    await page.getByTestId('login-input').fill('login123');
    await page.getByTestId('password-input').fill('passwor');
    await page.getByTestId('password-input').blur();

    const expectedErrormessage = 'identyfikator ma min. 8 znaków';

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
