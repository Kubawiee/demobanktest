import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';
export class LoginPage {
  constructor(private page: Page) {}
  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  loginErrorPassword = this.page.getByTestId('error-login-password');
  sideMenuComponent = new SideMenuComponent(this.page);

  //login
  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
