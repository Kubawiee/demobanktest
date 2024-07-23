import { test, expect } from '@playwright/test';
import { SearchPage } from '../page/G2A.page';
import { G2ACartPage } from '../page/G2ACart.page';

const productName = process.env.PRODUCT_NAME || 'The Witcher 3';
const MAX_RETRIES = 3;

test.describe('G2A Product Search and Cart Test', () => {
  test('Search for product, add to cart, and verify price @search @integration', async ({
    browser,
  }) => {
    console.log(`Searching for product: ${productName}`);

    let productPriceBeforeCart: string | null = null;
    let cartTotalPrice: string | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        const searchPage = new SearchPage(page);
        const g2aCartPage = new G2ACartPage(page);

        await page.goto('https://www.g2a.com/pl/');

        productPriceBeforeCart =
          await searchPage.searchAndGetPrice(productName);
        console.log(
          `Product price before adding to cart: ${productPriceBeforeCart}`,
        );

        await searchPage.searchAddToCartAndHandlePopup();

        await g2aCartPage.goToCart();
        cartTotalPrice = await g2aCartPage.getTotalPrice();
        console.log(`Cart total price: ${cartTotalPrice}`);

        break; // If we reach this point, the test was successful
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt === MAX_RETRIES - 1) {
          throw error; // Rethrow the error on the last attempt
        }
      } finally {
        await context.close(); // Ensure the context is always closed
      }

      // Wait between retries
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Verify prices
    console.log(`Final comparison:`);
    console.log(
      `Product price before adding to cart: ${productPriceBeforeCart}`,
    );
    console.log(`Cart total price: ${cartTotalPrice}`);

    expect(
      productPriceBeforeCart,
      'Product price should not be null',
    ).not.toBeNull();
    expect(
      cartTotalPrice,
      'Cart total price should not be null',
    ).not.toBeNull();

    if (productPriceBeforeCart && cartTotalPrice) {
      // Remove any non-digit characters and convert to numbers for comparison
      const cleanProductPrice = parseFloat(
        productPriceBeforeCart.replace(/[^\d.]/g, ''),
      );
      const cleanCartPrice = parseFloat(cartTotalPrice.replace(/[^\d.]/g, ''));

      console.log(`Cleaned product price: ${cleanProductPrice}`);
      console.log(`Cleaned cart total price: ${cleanCartPrice}`);

      // Compare the cleaned prices
      expect(cleanCartPrice).toBeCloseTo(cleanProductPrice, 2);
      console.log(
        `Price comparison successful: Product price "${cleanProductPrice}" matches cart total "${cleanCartPrice}"`,
      );
    } else {
      throw new Error('Failed to retrieve product price or cart total price');
    }
  });
});
