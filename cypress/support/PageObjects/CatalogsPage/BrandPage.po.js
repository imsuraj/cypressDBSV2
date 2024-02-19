export class BrandPage {



    searchIconELe = '.search-input > div > .sc-jSUZER'
    searchBoxEle = '#searchId'
    createIconEle = "svg[class$='icon plus']"

    threeDotMenuELe = '[class="sc-jSUZER kEEkyt  "]'


    clickOnSearchIcon() {
        cy.get(this.searchIconELe).click()
    }

    enterValueInTheSearchBox(value) {
        cy.get(this.searchBoxEle).type(value + '{enter}')
        cy.wait(1000)
        // cy.get('tbody tr').should('contain',value)
    }


    ClickOnEditAsPerValue(value) {
        cy.get('tbody').contains('tr', value).then(tableRow => {
            cy.wrap(tableRow).find(this.threeDotMenuELe).click()
            cy.contains('Edit').click()
        })
    }

    seachEachRow(value) {
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).find('td').eq(1).should('contain', value)
        })
    }

    seachMultipleValueEachRow(value) {


        const lowerCaseValue = value.map(item => item.toLowerCase());
        cy.wrap(lowerCaseValue).each(lowerCaseValue => {
            this.enterValueInTheSearchBox(lowerCaseValue)
            cy.get('tbody tr').each(tableRow => {
                try {
                    cy.wrap(tableRow)
                        .find('td')
                        .eq(1)
                        .invoke('text')
                        .then(text => {
                            const lowerCaseText = text.toLowerCase();
                            cy.wrap(lowerCaseText).should('include', lowerCaseValue)
                        })
                } catch (error) {
                    cy.log(lowerCaseValue + " is not matching. Check manually")
                }
            })
            this.clickOnSearchIcon()
        })

    }


}



export const onBrandPage = new BrandPage();