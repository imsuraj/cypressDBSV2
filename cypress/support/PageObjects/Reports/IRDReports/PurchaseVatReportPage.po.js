export class PurchaseVatReportPage {

    searchByInvoiceNumnber(invoiceNumber) {
        cy.searchByText(invoiceNumber)
        // cy.wait(2000)
        cy.contains('tbody tr td',invoiceNumber)
    }


    getTotalPurchase(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(3).invoke('text').then(totalPurchase => {
                cy.wrap(totalPurchase).as(alias)
            })
        })
    }

    getTaxExempted(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(4).invoke('text').then(taxExempted => {
                cy.wrap(taxExempted).as(alias)
            })
        })
    }

    getTaxablePurchase(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(5).invoke('text').then(getTaxablePurchase => {
                cy.wrap(getTaxablePurchase).as(alias)
            })
        })
    }

    getVat(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).invoke('text').then(vat => {
                cy.wrap(vat).as(alias)
            })
        })
    }



}



export const onPurchaseVatReport = new PurchaseVatReportPage()