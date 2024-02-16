const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po")
const { onCashBookPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/CashBookPage.po")
const { onLedgerReportPage } = require("../../../../support/PageObjects/Reports/GeneralLedgerReports/LedgerReportPage.po")


describe('Customer Report Test SUite',() => {


    beforeEach('Login',() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickLedgerReport()
        
    })



    it.only('Verify Sales Report Search',() => {
        onLedgerReportPage.searchLedgerWithName('SALES A/C')
        onLedgerReportPage.openLedgerReport('SALES A/C')
        onLedgerReportPage.openReconciledDetails()
        onLedgerReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('SALES A/C reconciled')
        })

        onLedgerReportPage.searchInvoiceInReportDetails('APPL-SI/0001456/80-81')
        onLedgerReportPage.getDebitValueByInvoiceNum('APPL-SI/0001456/80-81', 'debitValue')
        onLedgerReportPage.getCreditValueByInvoiceNum('APPL-SI/0001456/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })
        


        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickLedgerReport()

        onLedgerReportPage.searchLedgerWithName('VAT A/C')
        onLedgerReportPage.openLedgerReport('VAT A/C')
        onLedgerReportPage.openReconciledDetails()
        onLedgerReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('VAT A/C reconciled')
        })
        onLedgerReportPage.searchInvoiceInReportDetails('APPL-SI/0001456/80-81')
        onLedgerReportPage.getDebitValueByInvoiceNum('APPL-SI/0001456/80-81', 'debitValue')
        onLedgerReportPage.getCreditValueByInvoiceNum('APPL-SI/0001456/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })

    })


    it('Verify VAT A/c  Search',() => {
        onLedgerReportPage.searchLedgerWithName('VAT A/C')
        onLedgerReportPage.openLedgerReport('VAT A/C')
        onLedgerReportPage.openReconciledDetails()
        onLedgerReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('VAT A/C reconciled')
        })
        onLedgerReportPage.searchInvoiceInReportDetails('APPL-SI/0001456/80-81')
        onLedgerReportPage.getDebitValueByInvoiceNum('APPL-SI/0001456/80-81', 'debitValue')
        onLedgerReportPage.getCreditValueByInvoiceNum('APPL-SI/0001456/80-81', 'creditValue')

        cy.get('@debitValue').then(debitValue => {
            cy.log(debitValue)

        })

        cy.get('@creditValue').then(creditValue => {
            cy.log(creditValue)

        })
    })


})