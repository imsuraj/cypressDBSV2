export class PromotionsPage {


    searchIconELe = '.search-input > div > .sc-jSUZER'
    searchBoxEle = '#searchId'
    dateFilterEle = '.datepicker-content'
    standardFilterEle = '.filter-icon > .sc-jSUZER'
    createIconEle = "svg[class$='icon plus']"


    clickCreateIcon () {
        cy.get(this.createIconEle).should('be.visible').click()
    }


    searchPromotion(text) {
        cy.get(this.searchIconELe).should('be.visible').click()
        cy.get(this.searchBoxEle).type(text+'{enter}', {force:true})
        cy.wait(1000)
    }

    checkSearchedValueIsDisplayed(text) {
        cy.contains('tbody tr td',text)
    }



}


export const onPromotionsPage = new PromotionsPage()