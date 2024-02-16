const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po")
const { onSalesVatReport } = require("../../../../support/PageObjects/Reports/IRDReports/SalesVatReportPage.po")
const { onUpdateSalesVatReport } = require("../../../../support/PageObjects/Reports/IRDReports/UpdagteSalesVatReportPage.po")

describe('Updated Sales Vat Report Test', () => {


    beforeEach('Login', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverIrdReports()
        onDashboardPage.openSalesVatReport()
    })


    it('Verify Updated Sales Vat Report', () => {


        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('Sales VAT Report')
        })

        onSalesVatReport.searchByInvoiceNumnber('APPL-SI/0001365/80-81')
        onSalesVatReport.getTotalSales('totalSales')
        onSalesVatReport.getTaxExempted('taxExempted')
        onSalesVatReport.getTaxableSales('taxableSales')
        onSalesVatReport.getVat('vat')
        cy.get('@totalSales').then(totalSales => {
            cy.log(totalSales)
        })


        cy.get('@taxExempted').then(taxExempted => {
            cy.log(taxExempted)
        })

        cy.get('@taxableSales').then(taxableSales => {
            cy.log(taxableSales)
        })

        cy.get('@vat').then(vat => {
            cy.log(vat)
        })

        

    })
})