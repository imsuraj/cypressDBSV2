# CypressDBS

This project is a test automation suite using [Cypress](https://www.cypress.io/) for the DBS v2 application. It includes various e2e tests and scripts for running tests in parallel, generating reports, and managing test environments.

## Features

- Automated end-to-end testing with Cypress.
- Parallel test execution for improved efficiency.
- Reporting integration with Mochawesome.
- Environment-specific configurations.

## Getting Started

1. **Clone the project and navigate to the project directory**:
   Replace `<path to /cypressDBSv2>` with the actual path to your project folder.

   ```bash
   cd <path to /cypressDBSv2 folder>
   ```

2. **Install Dependencies**:
   Run the following command to install necessary dependencies.

   ```bash
   npm install
   ```

## Running Tests

Use the following commands to open and run your Cypress tests in different environments:

- **To open Cypress in the development environment and run test individually:**

  ```bash
  npm run cy:open_test --env=dev
  ```

- **To open Cypress in the staging environment and run test individually:**

  ```bash
  npm run cy:open_test --env=staging
  ```

- **To run tests in the development environment:**

  ```bash
  npm run cy:run_test --env=dev
  ```

- **To run tests in the staging environment:**

  ```bash
  npm run cy:run_test --env=staging
  ```

  NOTE: The test will run in qa environment by default when env value is not passed
