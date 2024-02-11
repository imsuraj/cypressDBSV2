export class UpdatedSalesVatReportPage {

    searchByInvoiceNumnber(invoiceNumber) {
        cy.searchByText(invoiceNumber)
        // cy.wait(2000)
        cy.contains('tbody tr td',invoiceNumber)
    }


    getTotalSales(invoiceNumber, alias) {
        cy.contains('tr',invoiceNumber).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(4).invoke('text').then(totalSales => {
                cy.wrap(totalSales).as(alias)
            })
        })
    }

    getTaxExempted(invoiceNumber, alias) {
        cy.contains('tr',invoiceNumber).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(5).invoke('text').then(totalSales => {
                cy.wrap(totalSales).as(alias)
            })
        })
    }

    getTaxableSales(invoiceNumber, alias) {
        cy.contains('tr',invoiceNumber).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).invoke('text').then(totalSales => {
                cy.wrap(totalSales).as(alias)
            })
        })
    }

    getVat(invoiceNumber, alias) {
        cy.contains('tr',invoiceNumber).then(tableRow => {
            cy.wrap(tableRow).find('td').eq(7).invoke('text').then(totalSales => {
                cy.wrap(totalSales).as(alias)
            })
        })
    }



}



export const onUpdateSalesVatReport = new UpdatedSalesVatReportPage()