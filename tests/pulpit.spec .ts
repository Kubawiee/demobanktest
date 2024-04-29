import { test, expect } from '@playwright/test';


test.describe('User login to Ecomerce', () => {

  test('login with correct credentails', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('kuba1234');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
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