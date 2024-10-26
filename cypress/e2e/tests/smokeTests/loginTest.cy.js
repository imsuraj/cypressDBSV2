// Import the LoginPage page object
const {
  onLoginPage,
} = require("../../../support/PageObjects/LoginPage/LoginPage.po");

// Describe block for the Login Test Suite
describe("Login Test Suite", () => {
  // Before each test case, open the Login Page
  beforeEach("Open Login Page", () => {
    // cy.fixture('rosia_user2').as('data'); // Load the fixture data
    cy.openLoginPage();
  });

  // Test case to verify that all elements on the login page are displayed
  it("Verify Login page is displayed", () => {
    onLoginPage.isEmailDisplayed();
    onLoginPage.isPasswordDisplayed();
    onLoginPage.isForgetPasswordDisplayed();
    onLoginPage.isSignInButtonDisplayed();
  });

  // Test case to verify successful login with correct username and password
  it.only("Verify user can login with correct username and password", () => {
    onLoginPage.enterEmail(Cypress.env("username"));
    onLoginPage.enterPassword(Cypress.env("password"));
    onLoginPage.clickOnSubmitButton();

    // Define the list of API endpoints to validate
    const apiEndpoints = [
      "login",
      "company",
      "branch",
      "user-associate-list",
      "business-unit",
      "setting",
      "ledger",
      "dashboard",
      "dashboard/transaction-summary",
    ];

    // Call the reusable command to validate the API calls
    cy.validateAPICalls(apiEndpoints, [200, 201]);
  });

  // Test case to verify error messages for empty email and password
  it("Verify error message is displayed for empty email and password", () => {
    onLoginPage.clickOnSubmitButton();
    onLoginPage.checkEmailErrorMessage("Please enter your username!");
    onLoginPage.checkPasswordErrorMessage("Please Enter your password!");
  });

  // Test case to verify error message for invalid login credentials
  it("Verify error message is displayed when user login with invalid credentials", () => {
    onLoginPage.enterEmail("invalid_username");
    onLoginPage.enterPassword("invalid_password");
    onLoginPage.clickOnSubmitButton();
    onLoginPage.checkErrorMessage("Invalid Credentials!");
  });

  // Test case to verify error message for empty username
  it("Verify error message is displayed for empty username", () => {
    onLoginPage.enterPassword(Cypress.env("password"));
    onLoginPage.clickOnSubmitButton();
    onLoginPage.checkEmailErrorMessage("Please enter your username!");
  });

  // Test case to verify error message for empty password
  it("Verify error message is displayed for empty password", () => {
    onLoginPage.enterEmail(Cypress.env("username"));
    onLoginPage.clickOnSubmitButton();
    onLoginPage.checkPasswordErrorMessage("Please Enter your password!");
  });

  // Test case to verify successful login with valid credentials
  it("Should login successfully with valid credentials", () => {
    onLoginPage.login(Cypress.env("username"), Cypress.env("password"));
  });

  // Skip test case for login using fixtures
  it.skip("Login using fixtures", () => {
    cy.fixture("rosia_user").then((data) => {
      onLoginPage.login(data.email, data.password);
    });
  });

  // Skip test case for login using fixtures data driver
  it.skip("Login using fixtures data driver", () => {
    cy.get("@data").then((data) => {
      data.forEach((user) => {
        cy.log(`Email: ${user.email}, Pass: ${user.password}`);
        // Perform test actions/assertions using the user data
        onLoginPage.login(user.email, user.password);
        onLoginPage.checkErrorMessage(user.expectedMessage);
        cy.reload();
      });
    });
  });
});
