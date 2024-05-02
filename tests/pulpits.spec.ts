import { test, expect } from '@playwright/test';

test.describe('Pulpit test', () => {
  test.beforeEach('Before Each', async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);
  });
  test('quick payment metod', async ({ page }) => {
    //Arrange
    const userId = 'kuba1234';
    const userPassword = 'password';

    const receiverId = '2';
    const amoutCash = '1000';
    const productTitle = 'przelew szybkiX';
    const expectedUserName = 'XPrzelew wykonany! Chuck Demobankowy - ';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(amoutCash);
    await page.locator('#widget_1_transfer_title').fill(productTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `${expectedUserName} ${amoutCash},00PLN - ${productTitle}`,
    );
  });
  test('quick payment metod2', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12312548');
    await page.getByTestId('password-input').fill('45456555');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('100');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 100,00PLN na numer 502 xxx xxx',
    );
  });
});
