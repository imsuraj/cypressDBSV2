export class LoginPage {

    email = "input[placeholder='Email']"
    password = "input[placeholder='Password']"
    signInButton = 'button'
    forgetPassword = 'Forgot Password?'

    emailError = "div[class='form-input error-msg form-input-email '] span[class='error-message']"
    passwordError = "div[class='form-input error-msg form-input-password '] span[class='error-message']"
    errorMessage = '[class="alert-message"]'

    checkEmailErrorMessage(message){
        cy.get(this.emailError).should('be.visible').and('contain.text', message);
    }

    checkPasswordErrorMessage(message){
        cy.get(this.passwordError).should('be.visible').and('contain.text', message);
    }

    checkErrorMessage(message) {
        cy.get(this.errorMessage).should('be.visible').and('contain.text', message);
    }


    isEmailDisplayed(){
        cy.get(this.email).should('be.visible')
    }

    enterEmail(username) {
        cy.get(this.email).type(username)
    }

    isPasswordDisplayed() {
        cy.get(this.password).should('be.visible')
    }

    enterPassword(password) {
        cy.get(this.password).type(password)
    }

    isSignInButtonDisplayed() {
        cy.get(this.signInButton).should('be.visible')
    }

    clickOnSubmitButton(){
        cy.get(this.signInButton).click()
    }

    isForgetPasswordDisplayed(){
        cy.contains(this.forgetPassword).should('be.visible')
    }

    login(email, password){
        this.enterEmail(email)
        this.enterPassword(password)
        this.clickOnSubmitButton()
        // cy.url().should('include', '/dashboard')
        // cy.get('.active > .img-holder > img').should('exist')
        // cy.get('.active > p').should('be.visible').contains('Dashboard')
    }

}

export const onLoginPage = new LoginPage()