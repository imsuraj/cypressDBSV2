export class CustomerReportPage {


    searchIconEle = '.search-input > div > .sc-jSUZER'
    searchFieldEle = '#searchId'

    header = 'h2'


    searchCustomerWithLedgerName(ledgerName) {
        cy.get(this.searchIconEle).click({ force: true })
        cy.get(this.searchFieldEle).type(ledgerName+'{enter}', {force: true})
        cy.wait(1000)
    }

    openCustomerReport(customerName) {
        cy.contains(customerName).click({force: true})
    }

    openReconciledDetails() {
        cy.contains('Reconciled').click({force: true})
    }

    openPendingDetails() {
        cy.contains('Pending').click({force: true})
    }


    getHeaderText(alias) {
        cy.get(this.header).invoke('text').then(headerText => {
            cy.wrap(headerText).as(alias)
        })
    }

    searchInvoiceInReportDetails(invoiceNum) {
        this.searchCustomerWithLedgerName(invoiceNum)
    }
    getDebitValueByInvoiceNum(invoiceNum, alias) {
        cy.contains('tr',invoiceNum).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(5).invoke('text').then(debitValue =>  {
                cy.wrap(debitValue).as(alias)
            })      
        }) 
    }


    getCreditValueByInvoiceNum(invoiceNum, alias) {
        cy.contains('tr',invoiceNum).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).invoke('text').then(debitValue =>  {
                cy.wrap(debitValue).as(alias)
            })      
        })  
    }



}


export const onCustomerReportPage = new CustomerReportPage()