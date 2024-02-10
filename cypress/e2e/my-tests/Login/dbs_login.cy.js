describe('Login', () => {
    let elementText
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))  
    });

    it('should display login form', () => {
        cy.get("input[placeholder='Email']").should('be.visible');
    });

    it('should display error message for empty email and password', () => {
      
        cy.get('button').click()

        cy.get('.form-input-email > .sc-hHTYSt > .error-message').should('be.visible').and('contain.text', 'Please enter your username!');
        cy.get('.password__input > .form-input > .sc-hHTYSt > .error-message').should('be.visible').and('contain.text', 'Please Enter your password!');
        
    }); 
    
    it('should display error message for invalid credentials', () => {
        cy.get("input[placeholder='Email']").type('invalid_username')
        cy.get("input[placeholder='Password']").type('invalid_password')
        cy.get('button').click()

        cy.get('.alert-message').should('be.visible').and('contain.text', 'Invalid Credentials!');
    });

    it('should display error message for empty username', () => {
        cy.get("input[placeholder='Password']").type('Evolve@123')
        cy.get('button').click()
        cy.get('.form-input-email > .sc-hHTYSt > .error-message').should('be.visible').and('contain.text', 'Please enter your username!');
        
    });

    it('should display error message for empty password', () => {
        cy.get("input[placeholder='Email']").type('suraj+amazon@evolveasia.co')
        cy.get('button').click()
        cy.get('.password__input > .form-input > .sc-hHTYSt > .error-message').should('be.visible').and('contain.text', 'Please Enter your password!');
       
    });

    it('should login successfully with valid credentials', () => {
        cy.get("input[placeholder='Email']").type(Cypress.env('email'))
        cy.get("input[placeholder='Password']").type(Cypress.env('password'))
        cy.get('button').click()

        cy.url().should('include', '/dashboard')
    
        
        cy.wait(2000)

        cy.get('h1').should('be.visible').invoke('text').then((text) => {
            elementText = text
            cy.log('Store element text : '+elementText)
        })
    });
});
