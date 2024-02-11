const { onLoginPage } = require("../../../support/PageObjects/LoginPage")


describe('Login Test Suite', () => {

  beforeEach('Open Login Page', () => {
   // cy.fixture('rosia_user2').as('data'); // Load the fixture data
    cy.openLoginPage()
  })


  it('Verify Login page is displayed', () => {
    onLoginPage.isEmailDisplayed()
    onLoginPage.isPasswordDisplayed()
    onLoginPage.isForgetPasswordDisplayed()
    onLoginPage.isSignInButtonDisplayed()

  })

  it('Verify user can login with correct username and password', () => {
    onLoginPage.enterEmail(Cypress.env('username'))
    onLoginPage.enterPassword(Cypress.env('password'))
    onLoginPage.clickOnSubmitButton()
  })

  it('Verify error message is displayed for empty email and password', () => {

    onLoginPage.clickOnSubmitButton()
    onLoginPage.checkEmailErrorMessage('Please enter your username!')
    onLoginPage.checkPasswordErrorMessage('Please Enter your password!')
    // onLoginPage.checkErrorMessage('Incorrect username or password.')
  })


  it('Verify error message is displayed when user login with invalid credentials', () => {
    onLoginPage.enterEmail('invalid_username')
    onLoginPage.enterPassword('invalid_password')
    onLoginPage.clickOnSubmitButton()
    onLoginPage.checkErrorMessage('Invalid Credentials!')
  })


  it('Verify error message is displayed for empty username', () => {
    onLoginPage.enterPassword(Cypress.env('password'))
    onLoginPage.clickOnSubmitButton()
    onLoginPage.checkEmailErrorMessage('Please enter your username!')

  });

  it('Verify error message is displayed for empty password', () => {
    onLoginPage.enterEmail(Cypress.env('username'))
    onLoginPage.clickOnSubmitButton()
    onLoginPage.checkPasswordErrorMessage('Please Enter your password!')
  });

  it('Should login successfully with valid credentials', () => {
    onLoginPage.login(Cypress.env('username'), Cypress.env('password'))
  })


  it.skip('Login using fixtures', () => {

    cy.fixture('rosia_user').then((data) => {
      onLoginPage.login(data.email, data.password)
    })

  })

  //best approacg
  it.skip('Login using fixtures data driver', () => {
    cy.get('@data').then((data) => {
      data.forEach((user) => {
        cy.log(`Email: ${user.email}, Pass: ${user.password}`)
        // Perform test actions/assertions using the user data
        onLoginPage.login(user.email, user.password)
        onLoginPage.checkErrorMessage(user.expectedMessage)
        cy.reload()
      })
    })

  })

})
