export class ProductSalesReportPage {

    header = 'h2'
    datePickerEle = '.datepicker-content'
    dateItemEle = '[class="date-item"]'
    applyBtnEle = '.jKQpJu'

    loadingEle = '[class="loading-wrap"]'

    footerEle = '[class="MuiTableCell-root MuiTableCell-footer"]'


    applyTodayDate() {
        cy.get(this.datePickerEle).should('be.visible').click({ force: true })
        cy.get(this.dateItemEle).should('be.visible').contains('Today').click({ force: true })
        cy.get(this.applyBtnEle).click({force:true})
    }


    searchWithInvoiceNum(invoiceNum) {
        
        cy.searchByText(invoiceNum)
    }


    getHeaderText(alias) {
        cy.get(this.header).invoke('text').then(headerText => {
            cy.wrap(headerText).as(alias)
        })
    }

    checkLoadingIconIsNotDisplayed() {
        cy.get(this.loadingEle).should('not.be.visible')
    }



    verifySearchedTextIsDisplayedOnWebTable(invoiceNum) {
        cy.contains('tody tr td', invoiceNum).should('be.visible')
    }



    getQuantity(alias) {
        cy.get(this.footerEle).eq(1).invoke('text').then(quantity => {
            cy.wrap(quantity).as(alias)
        })
    }

    getRate(alias) {
        cy.get(this.footerEle).eq(2).invoke('text').then(rate => {
            cy.wrap(rate).as(alias)
        })
    }



    getDebitValueByInvoiceNum(invoiceNum, alias) {
        cy.contains('tr', invoiceNum).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(5).invoke('text').then(debitValue => {
                cy.wrap(debitValue).as(alias)
            })
        })
    }


    getCreditValueByInvoiceNum(invoiceNum, alias) {
        cy.contains('tr', invoiceNum).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).invoke('text').then(debitValue => {
                cy.wrap(debitValue).as(alias)
            })
        })
    }



}


export const onProductSalesReportPage = new ProductSalesReportPage()