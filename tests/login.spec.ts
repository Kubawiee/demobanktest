import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page/login.page';

test.describe('User login to Ecomerce ', () => {
  let loginPage: LoginPage;
  test.beforeEach('Before Each', async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });
  const expectedUsername = loginData.expectedUsername;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test('login with correct credentails @login @smoke', async ({ page }) => {
    //Arrange
    //Act
    await loginPage.login(userId, userPassword);

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('login with wrong to short login @login', async ({ page }) => {
    const userIncorrectLogin = 'login';
    const expectedErrorInccorectLogin = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userIncorrectLogin);
    await page.getByTestId('login-input').blur();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorInccorectLogin);
  });

  test('login with wrong too short password @login', async ({ page }) => {
    //Arrange
    const userInccorectPassword = 'passwor';
    const expectedErrorInccorectPassword = 'hasło ma min. 8 znaków';
    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userInccorectPassword);
    await loginPage.passwordInput.blur();
    //Assert
    await expect(loginPage.loginErrorPassword).toHaveText(
      expectedErrorInccorectPassword,
    );
  });
});
