import { onDashboardPage } from "../../../../../support/PageObjects/DashboardPage/DashboardPage.po.js";
import { onCreatePromotionPage } from "../../../../../support/PageObjects/PromotionPage/CreatePromotionPage.po.js";
import { onPromotionsPage } from "../../../../../support/PageObjects/PromotionPage/PromotionPage.po.js";

function getTime () {
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    return timestamp
}


describe("Create Promotions Test", () => {
    let title;

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

    it("Verify mandatory message is displayed", () => {

        onPromotionsPage.clickCreateIcon()
        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.clickSaveBtn()

        onCreatePromotionPage.getTitleErrorMessage().should("contain", "Promotion title is required")
        onCreatePromotionPage.getBUErrorMessage().should("contain", "Business unit is required")
        onCreatePromotionPage.getBrandErrorMessage().should("contain", "Brand is required")
        onCreatePromotionPage.getPromotionTypeErrorMessage().should("contain", "Promotion type is required")
        onCreatePromotionPage.getPromotionConditionErrorMessage().should("contain", "Condition is required")
        onCreatePromotionPage.getPromotionCriteriaErrorMessage().should("contain", "Criteria is required")
        onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")

        onCreatePromotionPage.getPromotionDisbursementTypeErrorMessage().should("contain", "Disbursement type is required")
        onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")

    })

    it("Verify mandatory message is displayed when user creates promotion with non required fields", () => {

        onPromotionsPage.clickCreateIcon()

        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.enterPromotionDescription("ABC")
        onCreatePromotionPage.clickSaveBtn()


        onCreatePromotionPage.getTitleErrorMessage().should("contain", "Promotion title is required")
        onCreatePromotionPage.getBUErrorMessage().should("contain", "Business unit is required")
        onCreatePromotionPage.getBrandErrorMessage().should("contain", "Brand is required")
        onCreatePromotionPage.getPromotionTypeErrorMessage().should("contain", "Promotion type is required")
        onCreatePromotionPage.getPromotionConditionErrorMessage().should("contain", "Condition is required")
        onCreatePromotionPage.getPromotionCriteriaErrorMessage().should("contain", "Criteria is required")
        onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")

        onCreatePromotionPage.getPromotionDisbursementTypeErrorMessage().should("contain", "Disbursement type is required")
        onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")

    })

    it("Verify user is redirected to list page on click of cancel button without entering data", () => {
        onPromotionsPage.clickCreateIcon()


        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.clickSaveBtn()

        onCreatePromotionPage.clickCancelBtn()
        cy.url().should('include', '/configuration/others/promotion')
        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Promotions')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })
    })

    it("Verify user is redirected to list page on click of cancel button after entering data", () => {
        onPromotionsPage.clickCreateIcon()

        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()
        // onCreatePromotionPage.enterPromotionTitle("Multiple sku promotion")
        onCreatePromotionPage.enterValueFor('Promotion Title','Multiple sku promotion')
        onCreatePromotionPage.enterValueFor('Description','Multiple sku promotion')
        // onCreatePromotionPage.enterPromotionDescription("Multiple sku promotion")
        onCreatePromotionPage.selectStartDate()
        onCreatePromotionPage.selectEndDate()
        onCreatePromotionPage.clickOnDropdown('Business Unit')
        onCreatePromotionPage.selectBusinessUnitValue("Sunfeast")

        onCreatePromotionPage.clickOnDropdown('Brand')
        onCreatePromotionPage.selectBrandValue("Good Day")

        onCreatePromotionPage.clickOnDropdown('SKU')
        onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")
        // onCreatePromotionPage.selectSkuValue("Fanta")
        // onCreatePromotionPage.selectSkuValue("Dates")
        onCreatePromotionPage.clickOnDropdown('Promotion Type')
        onCreatePromotionPage.selectPromotionTypeValue("Normal")

        onCreatePromotionPage.clickOnDropdown('Condition')
        onCreatePromotionPage.selectPromotionConditionValue("Quantity")

        onCreatePromotionPage.clickOnDropdown('Criteria')
        onCreatePromotionPage.selectPromotionCriteriaValue(">= (GREATER THAN EQUALS)")

        onCreatePromotionPage.enterPromotionConditionValue(12)

        onCreatePromotionPage.clickOnDropdown('Disbursement Type')
        onCreatePromotionPage.selectPromotionDisbursement("Discount")

        onCreatePromotionPage.enterPromotionDisbursementValue(2)

        onCreatePromotionPage.clickCancelBtn()
        cy.url().should('include', '/configuration/others/promotion')
        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Promotions')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })


    })

    it("Verify char limit in title and description", () => {

        onPromotionsPage.clickCreateIcon()

        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()
        onCreatePromotionPage.enterPromotionTitle("rtCACpo1TzdOYj2Dm7g7AoNgEbTb990AnSLhT9KeNjs4mpjs4sD4PCfmcQbPju0CS3xTsZCH2Vi9iQOWmw1X0QI6rfXJYwageU2OGR4zMk1CSDtv3JuvvjW39UYnaZ6psnd3QM000eis6YX8tQtYDTJAvk6S3gk6BHA3RAjJe6a9lD4zaxWRlpX03AEADSDrVzoeyRH8Lj8UH9Fgsh5LP3YNlIXvV9ACSj7e7uTSyxSJsTa2pfvOMIZFmDtBDQVS")
        onCreatePromotionPage.enterPromotionDescription("rtCACpo1TzdOYj2Dm7g7AoNgEbTb990AnSLhT9KeNjs4mpjs4sD4PCfmcQbPju0CS3xTsZCH2Vi9iQOWmw1X0QI6rfXJYwageU2OGR4zMk1CSDtv3JuvvjW39UYnaZ6psnd3QM000eis6YX8tQtYDTJAvk6S3gk6BHA3RAjJe6a9lD4zaxWRlpX03AEADSDrVzoeyRH8Lj8UH9Fgsh5LP3YNlIXvV9ACSj7e7uTSyxSJsTa2pfvOMIZFmDtBDQVS")

        onCreatePromotionPage.getTitleErrorMessage().should("contain", "Promotion title must be atmost 255 characters long")
        onCreatePromotionPage.getDescErrorMessage().should("contain", "Description must be atmost 255 characters long")

    })

    it("Verify user cannot Create Promotions having criteria and disbursement value as 0", () => {

        onPromotionsPage.clickCreateIcon()

        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()

        onCreatePromotionPage.enterPromotionTitle("Multiple sku promotion")
        onCreatePromotionPage.enterPromotionDescription("Multiple sku promotion")

        onCreatePromotionPage.selectStartDate()
        onCreatePromotionPage.selectEndDate()

        onCreatePromotionPage.clickOnDropdown('Business Unit')
        onCreatePromotionPage.selectBusinessUnitValue("Sunfeast")

        onCreatePromotionPage.clickOnDropdown('Brand')
        onCreatePromotionPage.selectBrandValue("Good Day")

        onCreatePromotionPage.clickOnDropdown('SKU')
        onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")

        onCreatePromotionPage.clickOnDropdown('SKU')
        onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 25+8 gm x 168 NPR 10 NP [9000031]")


        onCreatePromotionPage.clickOnDropdown('Promotion Type')
        onCreatePromotionPage.selectPromotionTypeValue("Normal")

        onCreatePromotionPage.clickOnDropdown('Condition')
        onCreatePromotionPage.selectPromotionConditionValue("Quantity")

        onCreatePromotionPage.clickOnDropdown('Criteria')
        onCreatePromotionPage.selectPromotionCriteriaValue(">= (GREATER THAN EQUALS)")

        onCreatePromotionPage.enterPromotionConditionValue(0.00)

        onCreatePromotionPage.clickOnDropdown('Disbursement Type')
        onCreatePromotionPage.selectPromotionDisbursement("Discount")

        onCreatePromotionPage.enterPromotionDisbursementValue(0.00)

        onCreatePromotionPage.clickSaveBtn()

        onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")
        onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")

        // cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
        // cy.url().should('not.include', '/create')



    })

    it("Verify active integrated BU are displayed", () => {

        const desiredBu = ['Real Juice', 'Shreeyana Bu', 'Muna Chiya', "Hershey's", 'VAT BU', 'Noodles', 'Nails', 'DFD-TEST','QTY', 'Red Bull India', 'Mama Earth', 'Nepali Brand', 'Lenovo', 'Fix Derma', 'QA BU', 'Sunfeast', 'HFD', 'Mars']

        onPromotionsPage.clickCreateIcon()
        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()
        onCreatePromotionPage.clickOnDropdown('Business Unit')
        onCreatePromotionPage.checkDropdownValues(desiredBu)

    })

    it("Verify active brand for BU are displayed", () => {
        const desiredBrand = ['BOOST', 'HORLICKS', 'Promotional SKUs', 'QA', 'VIVA']

        onPromotionsPage.clickCreateIcon()
        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()
        onCreatePromotionPage.clickOnDropdown('Business Unit')
        onCreatePromotionPage.selectBusinessUnitValue('HFD')
        cy.wait(1000)
        onCreatePromotionPage.clickOnDropdown('Brand')
        onCreatePromotionPage.checkDropdownValues(desiredBrand)
    })

    it("Verify current date promotion is created without selecting both start and end date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)


                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)


                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify promotion is created without selecting start date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectEndDate()


                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)


                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify promotion is created without selecting end date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)


                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify user cannot Create Promotions without a brand", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                // onCreatePromotionPage.clickOnDropdown('Brand')
                // onCreatePromotionPage.selectBrandValue(promotion.brand)
                // onCreatePromotionPage.clickOnDropdown('SKU')
                // onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getBrandErrorMessage().should("contain", "Brand is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion type", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                // onCreatePromotionPage.clickOnDropdown('Promotion Type')
                // onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionTypeErrorMessage().should("contain", "Promotion type is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion condition", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                // onCreatePromotionPage.clickOnDropdown('Condition')
                // onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionConditionErrorMessage().should("contain", "Condition is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion criteria", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                // onCreatePromotionPage.clickOnDropdown('Criteria')
                // onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionCriteriaErrorMessage().should("contain", "Criteria is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion condition value", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                // onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion disbursement type", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                // onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                // onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionDisbursementTypeErrorMessage().should("contain", "Disbursement type is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion disbursement value", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()

                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)
                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)

                // onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()
                onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")
            })
        })

    })

    it("Verify user can Create Promotions for a brand without selecting sku", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()

                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()


                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                // onCreatePromotionPage.clickOnDropdown('SKU')
                // onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement(promotion.disbursementType)


                onCreatePromotionPage.enterPromotionDisbursementValue(promotion.disbursementValue)

                onCreatePromotionPage.clickSaveBtn()

                onCreatePromotionPage.getAlertMessage().should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })
    })

    it("Verify user can Create Promotions for a sku", () => {
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


                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
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

            })
        })

    })

    it("Verify user can Create Promotions for a multiple skus", () => {
        title = "Multiple sku promotion" + getTime()

        onPromotionsPage.clickCreateIcon()

        onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
        onCreatePromotionPage.isSaveBtnDisplayed()
        onCreatePromotionPage.enterPromotionTitle(title)
        onCreatePromotionPage.enterPromotionDescription(title)
        onCreatePromotionPage.selectStartDate()
        onCreatePromotionPage.selectEndDate()
        onCreatePromotionPage.clickOnDropdown('Business Unit')
        onCreatePromotionPage.selectBusinessUnitValue("Sunfeast")

        onCreatePromotionPage.clickOnDropdown('Brand')
        onCreatePromotionPage.selectBrandValue("Good Day")

        onCreatePromotionPage.clickOnDropdown('SKU')
        onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")

        onCreatePromotionPage.clickOnDropdown('SKU')
        onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 25+8 gm x 168 NPR 10 NP [9000031]")


        onCreatePromotionPage.clickOnDropdown('Promotion Type')
        onCreatePromotionPage.selectPromotionTypeValue("Normal")

        onCreatePromotionPage.clickOnDropdown('Condition')
        onCreatePromotionPage.selectPromotionConditionValue("Quantity")

        onCreatePromotionPage.clickOnDropdown('Criteria')
        onCreatePromotionPage.selectPromotionCriteriaValue(">= (GREATER THAN EQUALS)")

        onCreatePromotionPage.enterPromotionConditionValue(12)

        onCreatePromotionPage.clickOnDropdown('Disbursement Type')
        onCreatePromotionPage.selectPromotionDisbursement("Discount")

        onCreatePromotionPage.enterPromotionDisbursementValue(2)

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

        onPromotionsPage.searchPromotion(title)
        onPromotionsPage.checkSearchedValueIsDisplayed(title)
        onPromotionsPage.checkSearchedValueIsDisplayed("Active")
    })

    it.skip("verify Limit for value fields", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + getTime()
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                // cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')


                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

            })
        })



    })

    it("Verify user can Create Promotions with same title", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                const time = getTime()
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + time

                onPromotionsPage.clickCreateIcon()

                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()
                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)
                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()
                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue("Sunfeast")

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue("Good Day")

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 25+8 gm x 168 NPR 10 NP [9000031]")


                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue("Normal")

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue("Quantity")

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(">= (GREATER THAN EQUALS)")

                onCreatePromotionPage.enterPromotionConditionValue(12)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement("Discount")

                onCreatePromotionPage.enterPromotionDisbursementValue(2)

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

                onPromotionsPage.clickCreateIcon()

                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()
                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)
                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()
                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue("Sunfeast")

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue("Good Day")

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue("Sunfeast Good Day Butter Cookies 25+8 gm x 168 NPR 10 NP [9000031]")


                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue("Normal")

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue("Quantity")

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(">= (GREATER THAN EQUALS)")

                onCreatePromotionPage.enterPromotionConditionValue(12)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
                onCreatePromotionPage.selectPromotionDisbursement("Discount")

                onCreatePromotionPage.enterPromotionDisbursementValue(2)

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

                // onPromotionsPage.searchPromotion(time)
                onPromotionsPage.checkSearchedValueIsDisplayed(time)
                onPromotionsPage.checkSearchedValueIsDisplayed("Active")

            })
        })

    })

    it("Create Promotions for each condition and disbursement for a sku", () => {
        cy.get('@data').then((data) => {
            data.forEach((promotion) => {
                let time = getTime()
                let titleText = "Buy" + " " + promotion.brand + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " "
                let title = titleText + " " + time



                onPromotionsPage.clickCreateIcon()
                onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
                onCreatePromotionPage.isSaveBtnDisplayed()

                onCreatePromotionPage.enterPromotionTitle(title)
                onCreatePromotionPage.enterPromotionDescription(title)

                onCreatePromotionPage.selectStartDate()
                onCreatePromotionPage.selectEndDate()


                onCreatePromotionPage.clickOnDropdown('Business Unit')
                onCreatePromotionPage.selectBusinessUnitValue(promotion.bu)

                onCreatePromotionPage.clickOnDropdown('Brand')
                onCreatePromotionPage.selectBrandValue(promotion.brand)

                onCreatePromotionPage.clickOnDropdown('SKU')
                onCreatePromotionPage.selectSkuValue(promotion.sku)

                onCreatePromotionPage.clickOnDropdown('Promotion Type')
                onCreatePromotionPage.selectPromotionTypeValue('Normal')

                onCreatePromotionPage.clickOnDropdown('Condition')
                onCreatePromotionPage.selectPromotionConditionValue(promotion.condition)

                onCreatePromotionPage.clickOnDropdown('Criteria')
                onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria)

                onCreatePromotionPage.enterPromotionConditionValue(promotion.criteriaValue)

                onCreatePromotionPage.clickOnDropdown('Disbursement Type')
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
            })
        })



    })

})