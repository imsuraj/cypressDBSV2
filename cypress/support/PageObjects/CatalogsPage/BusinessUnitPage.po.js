export class BusinessUnitPage {



    searchIconELe = '.search-input > div > .sc-jSUZER'
    searchBoxEle = '#searchId'
    createIconEle = "svg[class$='icon plus']"

    threeDotMenuELe = '[class="sc-jSUZER kEEkyt  "]'


    clickOnSearchIcon() {
        cy.get(this.searchIconELe).click()
    }

    enterValueInTheSearchBox(value) {
        cy.get(this.searchBoxEle).type(value+'{enter}')
        cy.get('tbody tr').should('contain',value)
    }

    
    ClickOnEditAsPerValue(value) {
        cy.get('tbody').contains('tr', value).then(tableRow => {
            cy.wrap(tableRow).find(this.threeDotMenuELe).click()
            cy.contains('Edit').click()
        })
    }
    

}



export const onBusinessUnitPage = new BusinessUnitPage();