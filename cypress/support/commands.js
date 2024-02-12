// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import CreatePurchaseInvoicePage from "./PageObjects/PurchaseInvoicePage/CreatePurchaseInvoicePage"

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('openLoginPage',  () => {
    // cy.visit('/')
    cy.visit(Cypress.env('baseUrl'))
})

Cypress.Commands.add('login', (email, password) => {
    
    cy.visit(Cypress.env('baseUrl'))
    cy.get("input[placeholder='Email']").type(email)
    cy.get("input[placeholder='Password']").type(password)
    cy.get('button').click()
})


Cypress.Commands.add('searchByText',(text) => {
    cy.get('.search-input > div > .sc-jSUZER').should('be.visible').click({ force: true })
    cy.get('#searchId').should('be.visible').type(text+'{enter}', {force: true})
    cy.wait(1000)

})

Cypress.Commands.add('getHeaderText', (alias) => {
    cy.get('h2').invoke('text').then(headerText => {
        cy.wrap(headerText).as(alias)
    })
})
    

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })


Cypress.Commands.add('selectDropdownValue', (value) => {
    cy.get('.zindex-2__menu').find('.zindex-2__menu-list > div').contains(value).click()
})


/**
 * Trim text and assign it to the alias  
 */

Cypress.Commands.add('getTextAndAlias',(elementSelector, aliasName) => {
    cy.get(elementSelector)
        .invoke('text')
        .then((text) => {
            cy.wrap(text.trim()).as(aliasName); // 
        })
})



Cypress.Commands.add('selectDropdownValueForFilter', (value) => {
    cy.get('.filter-select__menu').find('.filter-select__menu-list > div').contains(value).click()
})


Cypress.Commands.add('selectDateFromCalendar', (value) => {
    cy.get('.rdrDays').find('button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span').contains(value).click()
})

Cypress.Commands.add('getTextAndStore', (selector, variableName) => {
    cy.get(selector).invoke('text').then((text) => {
      cy.wrap(text).as(variableName);
    });
  });
  





Cypress.Commands.add('addSKUforPRN', (skuTitle, batchName, sellable, damages, shortages, rate, excise, lineDisc) => {

    cy.get('tr > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container')
    .click()
    .type(skuTitle + "{enter}")

    cy.get('tr > :nth-child(3) > .sc-ftTHYK > .form-select-input')
    .click()
    .type(batchName + "{enter}")

    cy.get('tr > :nth-child(6) > .form-input > .sc-idXgbr')
    .click().clear()
    .type(sellable)
    
    cy.get('tr > :nth-child(7) > .form-input > .sc-idXgbr')
    .click().clear()
    .type(damages)

    cy.get('tr > :nth-child(8) > .form-input > .sc-idXgbr')
    .click().clear()
    .type(shortages)

    cy.get('tr > :nth-child(11) > .form-input > .sc-idXgbr')
    .click().clear()
    .type(rate)

    //Add bill terms
    // cy.get('.td-discount > .sc-jSUZER').click()

    // cy.get('.evolve-dialog__header > div > h2').should('be.visible')

    // cy.get(':nth-child(1) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr')
    // .click().clear().type(excise)


    // cy.get(':nth-child(2) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr')
    // .click().clear().type(lineDisc)

    // cy.get('.dSdSlu').click()
})




