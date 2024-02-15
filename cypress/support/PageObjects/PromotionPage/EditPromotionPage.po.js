export class EditPromotionPage {
    pageheader = "h2"

    editIconEle = '.sc-jSUZER > .sc-eDvSVe'
    statusToggleEle = 'div.switch-section > div.switch > div.react-switch-handle'



    getHeaderText() {
        return cy.get(this.pageheader)
    }


    isEditIconDisplayed() {
        cy.get(this.editIconEle).should('be.visible')
    }

    clickEditIcon () {
        cy.get(this.editIconEle).should("be.visible").click({force:true})
    }

    isStatusDisplayed() {
        return cy.get(this.statusToggleEle)
    }

    clickOnStatus() {
        cy.get(this.statusToggleEle).should('be.visible').click({force:true})
    }


}

export const onEditPromotionPage = new EditPromotionPage()