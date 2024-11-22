// LoginPage class represents the Page Object for the Login Page
export class LoginPage {
  // CSS selectors for page elements
  email = "input[placeholder='Email']";
  password = "input[placeholder='Password']";
  signInButton = 'button';
  forgetPassword = 'Forgot Password?';

  emailError =
    "div[class='form-input error-msg form-input-email '] span[class='error-message']";
  passwordError =
    "div[class='form-input error-msg form-input-password '] span[class='error-message']";
  errorMessage = '[class="alert-message"]';

  // Method to check and assert the displayed email error message
  checkEmailErrorMessage(message) {
    cy.get(this.emailError).should('be.visible').and('contain.text', message);
  }

  // Method to check and assert the displayed password error message
  checkPasswordErrorMessage(message) {
    cy.get(this.passwordError)
      .should('be.visible')
      .and('contain.text', message);
  }

  // Method to check and assert the displayed generic error message
  checkErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', message);
  }

  // Method to check if the email input field is displayed
  isEmailDisplayed() {
    cy.get(this.email).should('be.visible');
  }

  // Method to enter the provided email into the email input field
  enterEmail(username) {
    cy.get(this.email).type(username, { log: false });
  }

  // Method to check if the password input field is displayed
  isPasswordDisplayed() {
    cy.get(this.password).should('be.visible');
  }

  // Method to enter the provided password into the password input field
  enterPassword(password) {
    cy.get(this.password).type(password, { log: false });
  }

  // Method to check if the sign-in button is displayed
  isSignInButtonDisplayed() {
    cy.get(this.signInButton).should('be.visible');
  }

  // Method to click on the sign-in button
  clickOnSubmitButton() {
    cy.get(this.signInButton).click();
  }

  // Method to check if the 'Forgot Password?' link is displayed
  isForgetPasswordDisplayed() {
    cy.contains(this.forgetPassword).should('be.visible');
  }

  /**
   * Perform the login process with provided email and password.
   * @param {string} email - The email to be entered in the login form.
   * @param {string} password - The password to be entered in the login form.
   * @returns {void}
   */
  // Method to perform the complete login process with provided email and password

  login(email, password) {
    // Invoke the enterEmail method to input the provided email
    this.enterEmail(email);

    // Invoke the enterPassword method to input the provided password
    this.enterPassword(password);

    // Invoke the clickOnSubmitButton method to submit the login form
    this.clickOnSubmitButton();

    // Additional assertions can be added for successful login
    // For example, asserting the redirection to the dashboard or checking for a welcome message.
  }
}

// Exporting an instance of the LoginPage class as onLoginPage
export const onLoginPage = new LoginPage();
