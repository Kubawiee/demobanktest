import { test, expect } from '@playwright/test';


test.describe('User login to Ecomerce', () => {

  test('login with correct credentails', async ({ page }) => {
    //Arrange 
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'kuba1234';
    const userPassword = 'password';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);

  });

  test('login with wrong to short login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('login');
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('login with wrong too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('login123');
    await page.getByTestId('password-input').fill('passwor');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
});