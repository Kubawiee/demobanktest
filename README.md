# Playwright – Zadanie rekrutacyjne

G2A

## O Repozytorium

//run only with @tag
npx playwright test --grep "@login"
//run without @tag
npx playwright test --grep-invert "@login"
//run both tag
npx playwright test --grep "(?=.*@integration)(?=.*@pulpit)"
//Run test hedded
npx playwright test --headed
## Treść zadania rekrutacyjnego


### Playwright Config modifications

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
