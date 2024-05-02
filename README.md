# Playwright – Zadanie rekrutacyjne

Jakub Wierelak 04.2023  
Coffee Mug

## O Repozytorium

## Treść zadania rekrutacyjnego

Task: E-commerce Website Testing
Objective: Validate the functionality of key features on an e-commerce website using typescript and
cypress/playwright.  
Scenario to Test:

1. User Registration and Login:
   • Navigate to the e-commerce website's signup page.
   • Create a new user account by entering a unique username, email, and password. Handle
   any user input validations.
   • Verify successful registration and redirect to the login page.
   • Log in with the newly created credentials and confirm that the login is successful, and the
   user is directed to the homepage.

2. Product Search and Filter:  
   • Use the search function to find products related to "electronics."
   • Apply filters to narrow down the search results to items within a specific range.
   • Verify that the displayed products match the search criteria and filters applied.

3. Adding Items to Cart:  
   • Select a product from the search results and navigate to its details page.
   • Add the product to the shopping cart.
   • Verify that the cart updates correctly with the selected item  
   Tasks: Task 1: Test Implementation
   • Implement automated tests in Cypress/Playwright for the outlined scenarios. Ensure the
   tests are modular and reusable.

### Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
- testDir: './tests', //was ./e2e

  video:'retain-on-failure'
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- enable video on fail
  ```javascript
  use: {
      video: {'retain-on-failure'},
  },
  ```
- enable Trace Viewer on fial
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

### End
