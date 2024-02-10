class PurchaseInvoice {

    header = "h2"
    searchIcon = ".search-input > div > .sc-jSUZER"
    searchBox = "sc-idXgbr"
    createIcon = "svg[class$='icon plus']"


    getHeaderText() {
        return cy.get(this.header).should("be.visible")
    }

    clickOnSearchIcon() {
        cy.get(this.searchIcon).should('be.visible').click()
    }

    enterSearchText(searchText) {
        cy.get(this.searchBox).should('be.visible').click().type(searchText)
    }

    clickCreateIcon(){
        cy.get(this.createIcon).should('be.visible').click({force:true})
    }



}

export default PurchaseInvoice;