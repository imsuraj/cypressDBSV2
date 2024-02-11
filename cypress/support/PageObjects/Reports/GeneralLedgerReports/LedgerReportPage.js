export class LedgerReportPage {


    searchIconEle = '.search-input > div > .sc-jSUZER'
    searchFieldEle = '#searchId'

    header = 'h2'


    searchLedgerWithName(ledgerName) {
        cy.get(this.searchIconEle).should('be.visible').click({ force: true })
        cy.get(this.searchFieldEle).should('be.visible').type(ledgerName+'{enter}', {force: true})
        cy.wait(1000)
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


export const onLedgerReportPage = new LedgerReportPage()