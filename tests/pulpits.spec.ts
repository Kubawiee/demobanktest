import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page/login.page';
import { PulpitPage } from '../page/pulpit.page';

test.describe('Pulpit test', () => {
  let pulpitPage: PulpitPage;
  test.beforeEach('Before Each', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });
  test('quick payment metod @pulpit @integration', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '1000';
    const transferTitle = 'przelew szybkiX';
    const expectedTransferReceiver = 'Przelew wykonany! Chuck Demobankowy - ';

    // Act
    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle,
    );
    //await pulpitPage.transferReceiverInput.selectOption(receiverId);
    //await pulpitPage.transferAmountInput.fill(transferAmount);
    //await pulpitPage.transferTitleInput.fill(transferTitle);
    //await pulpitPage.transferButton.click();
    // await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `${expectedTransferReceiver} ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('successful mobile top-up @pulpit @integration', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);
    //await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    //await pulpitPage.topupAmountInput.fill(topUpAmount);
    //await pulpitPage.topupAgreementCheckbox.click();
    //await pulpitPage.topupExecuteButton.click();
    //await pulpitPage.actionCloseButton.click();
    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });
  test('correct balance after successful mobile top-up @pulpit @integration', async ({
    page,
  }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);
    //await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    //await pulpitPage.topupAmountInput.fill(topUpAmount);
    //await pulpitPage.topupAgreementCheckbox.click();
    //await pulpitPage.topupExecuteButton.click();
    //await pulpitPage.actionCloseButton.click();
    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
