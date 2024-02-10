const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage")
const { onCashBookPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/CashBookPage")
const { onLedgerReportPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/LedgerReportPage")


describe('Customer Report Test SUite',() => {


    beforeEach('Login',() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickLedgerReport()
        
    })



    it('Verify Cash Report Search',() => {
        onLedgerReportPage.searchLedgerWithName('SALES A/C')
        onLedgerReportPage.openLedgerReport('SALES A/C')
        onLedgerReportPage.openReconciledDetails()
        onLedgerReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('SALES A/C reconciled')
        })

        onLedgerReportPage.getDebitValueByInvoiceNum('APPL-SI/0001360/80-81', 'debitValue')
        onLedgerReportPage.getCreditValueByInvoiceNum('APPL-SI/0001360/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })
    })


})