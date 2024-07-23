import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  async acceptCookie(): Promise<void> {
    await this.page
      .waitForSelector('button[data-test-id="cookie-accept-all-btn"]', {
        state: 'visible',
        timeout: 10000,
      })
      .then((button) => button.click())
      .catch(() =>
        console.log('Cookie accept button not found or not clickable'),
      );
  }

  async searchFor(term: string): Promise<void> {
    await this.page.getByPlaceholder('Czego szukasz?').fill(term);
    await this.page.locator('.search_icon').click();
  }

  async selectCategory(): Promise<void> {
    await this.page
      .locator('section')
      .filter({ hasText: /^Wszystkie kategorie$/ })
      .getByRole('img')
      .nth(1)
      .click();
  }

  async clickFirstProduct(): Promise<void> {
    await this.page.locator('.productCard').first().click();
  }

  async getProductPrice(): Promise<string> {
    const priceElement = await this.page.waitForSelector(
      'span[data-locator="zth-price"]:first-of-type',
      { state: 'visible', timeout: 10000 },
    );
    const priceText = await priceElement.textContent();
    if (!priceText) {
      throw new Error('Price element text content is null or undefined.');
    }
    return priceText.trim();
  }

  async addToCart(): Promise<void> {
    await this.page
      .locator('[id="__next"] form')
      .getByRole('button', { name: 'Dodaj do koszyka' })
      .first()
      .click();
  }

  async clickPopupConfirmButton(): Promise<void> {
    const waitForPopup = await this.page.getByRole('img', { name: 'Modal info icon', });
    await this.page.locator('[data-test-id="primary-button"]').click();
  }

  async searchAndGetPrice(searchTerm: string): Promise<string> {
    await this.acceptCookie();
    await this.searchFor(searchTerm);
    await this.clickFirstProduct();
    return this.getProductPrice();
  }

  async searchAddToCartAndHandlePopup(): Promise<void> {
    await this.addToCart();
    await this.clickPopupConfirmButton();
  }
}
