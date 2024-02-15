const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onCreatePromotionPage } = require("../../../../../support/PageObjects/PromotionPage/CreatePromotionPage.po");
const { onPromotionsPage } = require("../../../../../support/PageObjects/PromotionPage/PromotionPage.po");

function getTime () {
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    return timestamp
}


describe("Delete Promotion Test", () => {
    let title

    beforeEach(() => {
        cy.fixture('promotions').as('data'); // Load the fixture data
        cy.fixture('promotionsSKU').as('data1'); // Load the fixture data
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.visit('/')
        cy.wait(2000)
        onDashboardPage.hoverMouseOverConfiguration()
        onDashboardPage.hoverMouseOverOther()
        onDashboardPage.openPromotion()

        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Promotions')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })
        
    })

    it("Verify user can delete promotion using three dot menu", () => {


        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {

                let time = getTime()
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + time

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickBusinessUnitDropdown()
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickBrandDropdown()
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickSkuDropdown()
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickPromotionTypeDropdown()
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickPromotionConditionDropdown()
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickPromotionCriteriaDropdown()
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickPromotionDisbursementDropdown()
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')
                cy.getHeaderText('headerText')
                cy.get('@headerText').then(headerText => {
                    try {
                        expect(headerText).to.eq('Promotions')
                    } catch (error) {
                        cy.log('Header Text does not match')
                    }
                })

                onPromotionsPage.searchPromotion(time)
                onPromotionsPage.checkSearchedValueIsDisplayed(time)
                onPromotionsPage.checkSearchedValueIsDisplayed("Active")

                onPromotionsPage.clickThreeDotMenu()
                onPromotionsPage.clickDelete()
                onPromotionsPage.getDeleteDialogHeaderText().should('have.text', "Confirmation Dialog")
                onPromotionsPage.getDialogMessage().should('have.text', "Are you sure you want to delete 1 promotion?")

                onPromotionsPage.clickOkButton()
                onPromotionsPage.getAlertMessage().should('contain', 'Promotion Deleted Successfully')
                cy.url().should('not.include', '/create')
                cy.getHeaderText('headerText')
                cy.get('@headerText').then(headerText => {
                    try {
                        expect(headerText).to.eq('Promotions')
                    } catch (error) {
                        cy.log('Header Text does not match')
                    }
                })
                // onPromotionsPage.searchPromotion(time)
                onPromotionsPage.checkElementIsDisplayed().should('not.exist')
            })
        })
    })

    it("Verify promotion is not deleted when user clicks on cancel button", () => {

   
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {

                let time = getTime()
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + time

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                // onCreatePromotionPage.selectStartDate()
                // onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickBusinessUnitDropdown()
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickBrandDropdown()
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickSkuDropdown()
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickPromotionTypeDropdown()
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickPromotionConditionDropdown()
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickPromotionCriteriaDropdown()
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickPromotionDisbursementDropdown()
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')
                cy.getHeaderText('headerText')
                cy.get('@headerText').then(headerText => {
                    try {
                        expect(headerText).to.eq('Promotions')
                    } catch (error) {
                        cy.log('Header Text does not match')
                    }
                })

                onPromotionsPage.searchPromotion(time)
                onPromotionsPage.checkSearchedValueIsDisplayed(time)
                onPromotionsPage.checkSearchedValueIsDisplayed("Active")

                onPromotionsPage.clickThreeDotMenu()
                onPromotionsPage.clickDelete()
                onPromotionsPage.getDeleteDialogHeaderText().should('have.text', "Confirmation Dialog")
                onPromotionsPage.getDialogMessage().should('have.text', "Are you sure you want to delete 1 promotion?")

                onPromotionsPage.clickCancelButton()
                onPromotionsPage.checkSearchedValueIsDisplayed(time)
                onPromotionsPage.checkSearchedValueIsDisplayed("Active")
            })
        })
    })

    it("Verify user can delete multiple promotion", () => {

        
        try {
            onPromotionsPage.selectCheckBoxes(1)
            onPromotionsPage.selectCheckBoxes(3)
            onPromotionsPage.selectCheckBoxes(4)
        } catch (error) {
            cy.log("Promotion are not available to delete.")
        }

        onPromotionsPage.clickOnDeleteIcon()
        onPromotionsPage.getDeleteDialogHeaderText().should('have.text', "Confirmation Dialog")
        onPromotionsPage.getDialogMessage().should('have.text', "Are you sure you want to delete 3 promotions?")

        onPromotionsPage.clickOkButton()
        onPromotionsPage.getAlertMessage().should('contain', 'Promotion Deleted Successfully')
        cy.url().should('not.include', '/create')
        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Promotions')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })
    })

    it("Verify promotion is not deleted when user clicks on cancel button in case of bulk delete", () => {


        try {
            onPromotionsPage.selectCheckBoxes(1)
            onPromotionsPage.selectCheckBoxes(3)
            onPromotionsPage.selectCheckBoxes(4)
        } catch (error) {
            cy.log("Promotion are not available to delete.")
        }

        onPromotionsPage.clickOnDeleteIcon()
        onPromotionsPage.getDeleteDialogHeaderText().should('have.text', "Confirmation Dialog")
        onPromotionsPage.getDialogMessage().should('have.text', "Are you sure you want to delete 3 promotions?")

        onPromotionsPage.clickCancelButton()
        onPromotionsPage.getDeleteDialogHeaderText().should('not.exist')


    })
})