export class LedgerReportPage {


    searchIconEle = '.search-input > div > .sc-jSUZER'
    searchBoxEle = '#searchId'

    header = 'h2'
    

    clickOnSearchIcon() {
        cy.get(this.searchIconEle).should('be.visible').click({force:true})
    }

    clearSearchBoxText() {
        cy.get(this.searchBoxEle).clear()
    }

    enterValueInSearchBox (value) {
        cy.get(this.searchBoxEle).type(value+'{enter}',{force:true})
    }


    searchVatBIllDiscTradeDiscLedger(ledgerName) {
        this.clickOnSearchIcon()
        cy.wait(1000)
        this.clickOnSearchIcon()
        cy.wait(1000)
        this.enterValueInSearchBox(ledgerName)
        cy.wait(1000)
        cy.contains('tbody tr td', ledgerName)
    }
    

    searchLedgerWithName(ledgerName) {
        cy.get(this.searchIconEle).should('be.visible').click({ force: true })
        cy.wait(1000)
        cy.get(this.searchBoxEle).should('be.visible').type(ledgerName+'{enter}', {force: true})
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