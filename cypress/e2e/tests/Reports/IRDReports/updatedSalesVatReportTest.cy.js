const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po")
const { onUpdateSalesVatReport } = require("../../../../support/PageObjects/Reports/IRDReports/UpdagteSalesVatReportPage.po")

describe('Updated Sales Vat Report Test', () => {


    beforeEach('Login', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouseOverIrdReports()
        onDashboardPage.openUpdatedSalesVatReport()
    })


    it('Verify Updated Sales Vat Report', () => {

        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.eq('Updated Sales VAT Report')
        })

        onUpdateSalesVatReport.searchByInvoiceNumnber('APPL-SI/0001365/80-81')
        onUpdateSalesVatReport.getTotalSales('APPL-SI/0001365/80-81','totalSales')
        onUpdateSalesVatReport.getTaxExempted('APPL-SI/0001365/80-81','taxExempted')
        onUpdateSalesVatReport.getTaxableSales('APPL-SI/0001365/80-81','taxableSales')
        onUpdateSalesVatReport.getVat('APPL-SI/0001365/80-81','vat')
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