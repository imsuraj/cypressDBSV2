const { onBusinessUnitPage } = require("../../../../../support/PageObjects/CatalogsPage/BusinessUnitPage.po")
const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po")

describe('BusinessUnit Page tests', () => {

    beforeEach('Open App, Login and go to business unit page', () => {
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.visit('/')
        onDashboardPage.hoverMouseOverConfiguration();
        onDashboardPage.hoverMouseOverCatalog();
        onDashboardPage.openBusinessUnits();
    })


    it('test', () => {
        onBusinessUnitPage.clickOnSearchIcon()
        onBusinessUnitPage.enterValueInTheSearchBox('Amazon')
        onBusinessUnitPage.ClickOnEditAsPerValue('Amazon')
    })

})