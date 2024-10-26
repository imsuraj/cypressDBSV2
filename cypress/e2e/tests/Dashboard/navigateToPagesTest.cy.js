const { onDashboardPage } = require("../../../support/PageObjects/DashboardPage/DashboardPage.po")




describe('Open pages suite', ()=> {
    beforeEach('Open App and Login', ()=> {
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.visit('/')
    })


    it('Open Sales Invoice Page', ()=> {
        onDashboardPage.hoverMouserOverSales()
        onDashboardPage.clickSalesInvoice ()
        onDashboardPage.verifySalesInvoiceUrl()
    })


    it('Open Ledger Report page ', () => {
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickLedgerReport()
        onDashboardPage.verifyLedgerReportUrl('/reports/general-ledger-reports/ledger-report')

    })


    it('Open Cashh Book Report page ', () => {
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickCashBookReport()
        onDashboardPage.verifyCashBookReportUrl('/reports/general-ledger-reports/ledger-cash-report')
    })


    it('Open Customer Report page ', () => {
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverGeneralLedgerReport()
        onDashboardPage.clickCustomerReport()
        onDashboardPage.verifyCustomerReportUrl('/reports/general-ledger-reports/ledger-customer-report')
    })

    it.only('Open Buiness Units page ', () => {
        onDashboardPage.hoverMouseOverConfiguration()
        onDashboardPage.hoverMouseOverCatalog()
        onDashboardPage.openBusinessUnits()
    })

    it.only('Open Promotion Page',() => {
        onDashboardPage.hoverMouseOverConfiguration()
        onDashboardPage.hoverMouseOverOther()
        onDashboardPage.openPromotion()
    })
})