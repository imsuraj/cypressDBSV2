export class CashBookPage {


    searchIconEle = '.search-input > div > .sc-jSUZER'
    searchFieldEle = '.sc-idXgbr'

    header = 'h2'


    searchLedgerWithName(ledgerName) {
        cy.searchByText(ledgerName)
        cy.wait(2000)
        cy.contains('tbody tr td',ledgerName)
    }

    openLedgerReport(ledgerName) {
        cy.contains(ledgerName).click({force: true})
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
        this.searchLedgerWithName(invoiceNum)
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


export const onCashBookPage = new CashBookPage()