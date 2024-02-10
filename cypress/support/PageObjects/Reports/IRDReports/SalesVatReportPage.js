export class SalesVatReportPage {

    searchByInvoiceNumnber(invoiceNumber) {
        cy.searchByText(invoiceNumber)
        cy.wait(2000)
        cy.contains('tbody tr td',invoiceNumber)
    }


    getTotalSales(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(3).invoke('text').then(totalSales => {
                cy.wrap(totalSales).as(alias)
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

    getTaxableSales(alias) {
        cy.get('tfoot tr').then(tableRow => {
            cy.wrap(tableRow).find('td').eq(5).invoke('text').then(taxableSales => {
                cy.wrap(taxableSales).as(alias)
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



export const onSalesVatReport = new SalesVatReportPage()