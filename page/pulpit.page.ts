import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';
export class PulpitPage {
  constructor(private page: Page) {}
  //loginInput = this.page.getByTestId('login-input');

  transferReceiverInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');
  messageText = this.page.locator('#show_messages');
  topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
  topupAmountInput = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topupExecuteButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
  moneyValueText = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');
  sideMenuComponent = new SideMenuComponent(this.page);
}
