const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage")
const { onCustomerReportPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/CustomerReportPage")

describe('Customer Report Test SUite',() => {


    beforeEach('Login',() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickCustomerReport()
        
    })



    it('Verify Customer Report Search',() => {
        onCustomerReportPage.searchCustomerWithLedgerName('Jain Kirana Pasal')
        onCustomerReportPage.openCustomerReport('Jain Kirana Pasal')
        onCustomerReportPage.openReconciledDetails()
        onCustomerReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('Jain Kirana Pasal reconciled')
        })

        onCustomerReportPage.getDebitValueByInvoiceNum('APPL-SI/0001360/80-81', 'debitValue')
        onCustomerReportPage.getCreditValueByInvoiceNum('APPL-SI/0001360/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })
    })


})