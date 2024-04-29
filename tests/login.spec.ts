import { test, expect } from '@playwright/test';


test.describe('Pulpit test', () => {

  test('quick payment metod', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('12312548');
    await page.getByTestId('password-input').fill('45456555');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('1000');
    await page.locator('#widget_1_transfer_title').fill('przelew szybki');
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 1000,00PLN - przelew szybki');
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

    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 100,00PLN na numer 502 xxx xxx');
  });



});