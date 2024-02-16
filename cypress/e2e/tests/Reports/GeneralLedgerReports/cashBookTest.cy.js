const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po")
const { onCashBookPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/CashBookPage.po")


describe('Customer Report Test SUite',() => {


    beforeEach('Login',() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickCashBookReport()
        
    })



    it('Verify Cash Report Search',() => {
        onCashBookPage.searchLedgerWithName('CASH A/C')
        onCashBookPage.openLedgerReport('CASH A/C')
        onCashBookPage.openReconciledDetails()
        onCashBookPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('CASH A/C reconciled')
        })

        onCashBookPage.getDebitValueByInvoiceNum('APPL-SI/0001360/80-81', 'debitValue')
        onCashBookPage.getCreditValueByInvoiceNum('APPL-SI/0001360/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })
    })


})