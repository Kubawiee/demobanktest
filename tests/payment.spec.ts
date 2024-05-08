import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../page/login.page';
import { PaymentPage } from '../page/payment.page ';
import { PulpitPage } from '../page/pulpit.page';
test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    //await page.getByRole('link', { name: 'płatności' }).click();

    paymentPage = new PaymentPage(page);
    await paymentPage.sideMenuComponent.paymentLink.click();
  });
  test('simple payment @payment @integration @sanity', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;
    // Act
    await paymentPage.makeTransfer(transferReceiver,transferAccount,transferAmount);
    //await paymentPage.transferReceiverInput.fill(transferReceiver);
    //await paymentPage.transferToInput.fill(transferAccount);
    //await paymentPage.transferAmountInput.fill(transferAmount);
    //await paymentPage.transferButton.click();
    //await paymentPage.actionCloseButton.click();
    
    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
