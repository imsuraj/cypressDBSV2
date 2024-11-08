export class PurchaseInvoicePage {

    header = "h2"
    searchIcon = ".search-input > div > .sc-jSUZER"
    searchBox = "#searchId"
    createIcon = "svg[class$='icon plus']"

    datePickerEle = '.datepicker-content'
    dateItemEle = '[class="date-item"]'
    applyBtnEle = '.jKQpJu'



    getHeaderText() {
        return cy.get(this.header).should("be.visible")
    }
    
    applyDateFilter(date) {
        cy.get(this.datePickerEle).should('be.visible').click({ force: true })
        cy.get(this.dateItemEle).should('be.visible').contains(date).click({ force: true })
        cy.get(this.applyBtnEle).click({force:true})
    }


    clickOnSearchIcon() {
        cy.get(this.searchIcon).click()
    }

    enterSearchText(searchText) {
        cy.get(this.searchBox).should('be.visible').click().type(searchText+'{enter}')
        cy.wait(2000)
    }

    clickCreateIcon(){
        cy.get(this.createIcon).should('be.visible').click({force:true})
    }

    getPurchaseDocNumberOfAVendorInvoiceNumber(vendorInvoiceNumber,aliasName) {
        this.clickOnSearchIcon()
        this.enterSearchText(vendorInvoiceNumber)
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).find('td').eq(2).should('contain', vendorInvoiceNumber)
            cy.wrap(tableRow).find('td').eq(1).invoke('text')
                .then((purchaseDocNum) => {
                    cy.wrap(purchaseDocNum).as(aliasName)
                })
        })

    }



}

export const onPIPage = new  PurchaseInvoicePage()