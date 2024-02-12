const { onDashboardPage } = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po")
const { onProductSalesReportPage } = require("../../../../support/PageObjects/Reports/SalesReports/ProductSalesReportPage.po")

describe('PSR Tests',() => {


    beforeEach('Login',() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        onDashboardPage.hoverMouseOverReports()
        onDashboardPage.hoverMouserOverSalesReports()
        onDashboardPage.clickProductSalesReport()
        
    })


    it.skip('Verify PSR Url', () => {
        onDashboardPage.verifyProductSalesReportUrl('/reports/sales-reports/product-sales-report')
    })

    it('Verify PSR Page Header', () => {
        onProductSalesReportPage.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            expect(headerText).to.equal('Product Sales Report')
        })

         onProductSalesReportPage.applyTodayDate()

        onProductSalesReportPage.searchWithInvoiceNum('APPL-SI/0001365/80-81')
        // // onProductSalesReportPage.checkLoadingIconIsNotDisplayed()
        // onProductSalesReportPage.verifySearchedTextIsDisplayedOnWebTable('APPL-SI/0001365/80-81')

    })


})