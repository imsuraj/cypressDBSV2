export class JournalVoucherDetailPage {

    invoiceNumberEle = '[class="value-div"] [class="as-input"]'

    subLedgerEle = 'td.search-table-input'
    debitAmountEle = '.debit'

    jvTotals = '[class="calculated-value right"]'


    verifySearchedInvoiceJvIsDisplayed(invoiceNumber) {
        cy.get(this.invoiceNumberEle).should('contain', invoiceNumber)
    }


    // getDebitValueForLedger(ledgerName) {
    //     return cy.get(`td.search-table-input:contains("${ledgerName}")`)
    //         .siblings('.debit')
    //         .invoke('text')
    //         .then((debitValue) => {
    //             cy.log(`Debit Value of ${ledgerName}: ${debitValue}`);
    //             // return parseFloat(debitValue);
    //         });
    // }
    
    getTotalsValue(index,aliasName) {
         cy.get(this.jvTotals).eq(index)
            .invoke('text')
            .then((totalAmount) => {
                cy.wrap(totalAmount).as(aliasName);
            })
    }

    getDebitValueForLedger(ledgerName, aliasName) {
        cy.get(`td.search-table-input:contains("${ledgerName}")`)
            .siblings('.debit')
            .invoke('text')
            .then((debitValue) => {
                cy.wrap(debitValue).as(aliasName);
            })
    }

    getCreditValueForLedger(ledgerName, aliasName) {
        cy.get(`td.search-table-input:contains("${ledgerName}")`)
            .siblings('.credit')
            .invoke('text')
            .then((debitValue) => {
                cy.wrap(debitValue).as(aliasName);
            })
    }
}

export const onJvDetailPage = new JournalVoucherDetailPage()