import { Page } from '@playwright/test';

const MAX_RETRIES = 3;
const RETRY_DELAY = 10000; // 10 seconds

export class G2ACartPage {
  constructor(private page: Page) {}

  private async retry<T>(fn: () => Promise<T>, errorMessage: string): Promise<T> {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await fn();
      } catch (error) {
        console.log(`Attempt ${i + 1} failed. Retrying...`);
        if (i === MAX_RETRIES - 1) {
          throw new Error(`${errorMessage}: ${error}`);
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
    throw new Error('Unexpected error in retry function');
  }

  async goToCart(): Promise<void> {
    await this.retry(async () => {
      await this.page.goto('https://www.g2a.com/page/cart', {
        waitUntil: 'domcontentloaded',
      });
      await this.page.waitForSelector('div[class*="indexes__Root-"] span[data-locator="zth-price"]', {
        state: 'visible',
        timeout: 15000,
      });
    }, 'Failed to go to cart page');
  }

  async getTotalPrice(): Promise<string> {
    return this.retry(async () => {
      const priceElement = await this.page.waitForSelector(
        'div[class*="indexes__Root-"] span[data-locator="zth-price"]',
        { state: 'visible', timeout: 15000 }
      );
      const priceText = await priceElement.textContent();
      if (!priceText) {
        throw new Error('Price element text content is null or undefined.');
      }
      return priceText.trim();
    }, 'Failed to get total price');
  }
}