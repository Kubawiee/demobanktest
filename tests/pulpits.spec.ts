import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page/login.page';
import { PulpitPage } from '../page/pulpit.page';

test.describe('Pulpit test', () => {
  test.beforeEach('Before Each', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test('quick payment metod', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '1000';
    const transferTitle = 'przelew szybkiX';
    const expectedTransferReceiver = 'Przelew wykonany! Chuck Demobankowy - ';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiverInput.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);
    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();
    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `${expectedTransferReceiver} ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    await pulpitPage.topupAmountInput.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();
    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });
  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // Act
    await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    await pulpitPage.topupAmountInput.fill(topUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();
    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
