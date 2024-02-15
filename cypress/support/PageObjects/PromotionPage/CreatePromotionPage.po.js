export class CreatePromotionPage {
    pageheader = "h2"
    btnSave = ":nth-child(2) > .sc-jSUZER > span"
    btnCancel = ":nth-child(1) > .sc-jSUZER > span"
    errPromotionTitle = ".col-lg-12 > .form-input > .sc-iJnaPW > .error-message"
    errPromotionDesc = ":nth-child(2) > :nth-child(1) > .form-input > .form-error > .error-message"
    errBU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message"
    errBrand = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message"
    errPromotionType = ':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message'
    erroCondition = ':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message'
    errorCriteria = ":nth-child(3) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message"
    errConditionVal = ":nth-child(4) > .form-input > .sc-iJnaPW > .error-message"
    errDisbursementType = ':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-hhOBVt > .form-select-input > .sc-cCjUiG > .error-message'
    errDisbursementVal = ":nth-child(2) > .form-input > .sc-iJnaPW > .error-message"

    txtTitle = '.form-input > input[placeholder="Promotion Title"]'
    txtDescription = '.form-input > input[placeholder="Description"]'

    calendarStartDate = '[class="moment"]'
    dateStartDate = ".rdrDayStartOfMonth > .rdrDayNumber > span"
    calendarEndDate = ":nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment"
    dateEndDate = ".rdrDayEndOfMonth > .rdrDayNumber > span"

    dropdownELe = '[class="zindex-2__input-container css-ackcql"]'
    bUDropdownValEle = "div.zindex-2__option "

    dropdownBU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownBrand = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownSKU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownPromotionType = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    dropdownPromotionCondition = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    dropdownPromotionCriteria = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    txtPromotionConditionVal = '.form-input > input[placeholder="Value"]'
    dropdownPromotionDisbursementType = ":nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    txtDisbursementVal = '.form-input > input[placeholder="Value"]'

    alertMessage = ".alert-message"





    getHeaderText() {
        return cy.get(this.pageheader)
    }

    isSaveBtnDisplayed() {
        cy.get(this.btnSave).should("be.visible")
    }

    clickSaveBtn() {
        cy.get(this.btnSave).should("be.visible").click()
    }

    clickCancelBtn() {
        cy.get(this.btnCancel).should("be.visible").click()
    }

    getTitleErrorMessage() {
        return cy.get(this.errPromotionTitle)
    }

    getDescErrorMessage() {
        return cy.get(this.errPromotionDesc)
    }

    getBUErrorMessage() {
        return cy.get(this.errBU)
    }

    getBrandErrorMessage() {
        return cy.get(this.errBrand)
    }

    getPromotionTypeErrorMessage() {
        return cy.get(this.errPromotionType)
    }

    getPromotionConditionErrorMessage() {
        return cy.get(this.erroCondition)
    }

    getPromotionCriteriaErrorMessage() {
        return cy.get(this.errorCriteria)
    }

    getPromotionConditionValErrorMessage() {
        return cy.get(this.errConditionVal)
    }

    getPromotionDisbursementTypeErrorMessage() {
        return cy.get(this.errDisbursementType)
    }

    getPromotionDisbursementValErrorMessage() {
        return cy.get(this.errDisbursementVal)
    }


    enterPromotionTitle(title) {
        cy.get(this.txtTitle).should('be.visible').clear().type(title)
    }

    enterPromotionDescription(description) {
        cy.get(this.txtDescription).should('be.visible').clear().type(description)
    }

    clickOnStartDateCalendar() {
        cy.get(this.calendarStartDate).eq(0).click()
    }

    selectStartDate() {
        this.clickOnStartDateCalendar()
        cy.get(this.dateStartDate).click()
    }

    clickOnEndDateCalendar() {
        cy.get(this.calendarStartDate).eq(1).click()
    }

    selectEndDate() {
        this.clickOnEndDateCalendar()
        cy.get(this.dateEndDate).click()
    }

    selectDateFromCalendar (value) {
        cy.get('.rdrDays').find('button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span').contains(value).click()
    }


    clickBusinessUnitDropdown() {
        cy.get(this.dropdownELe).eq(0).click({ force: true })
    }

    selectBusinessUnitValue(buName) {
        cy.get(this.bUDropdownValEle).contains(buName).click({ force: true })
    }


    clickBrandDropdown() {
        cy.get(this.dropdownELe).eq(1).click({ force: true })
    }

    selectBrandValue(brandName) {
        cy.get(this.bUDropdownValEle).contains(brandName).click({ force: true })
    }

    clickSkuDropdown() {
        cy.get(this.dropdownELe).eq(2).click({ force: true })
    }



    selectSkuValue(skuName) {
        cy.get(this.bUDropdownValEle).contains(skuName).click({ force: true })
    }

    clickPromotionTypeDropdown() {
        cy.get(this.dropdownELe).eq(3).click({ force: true })
    }

    selectPromotionTypeValue(promotionType) {
        cy.get(this.bUDropdownValEle).contains(promotionType).click({ force: true })
    }

    clickPromotionConditionDropdown() {
        cy.get(this.dropdownELe).eq(4).click({ force: true })
    }

    selectPromotionConditionValue(condition) {
        cy.get(this.bUDropdownValEle).contains(condition).click({ force: true })
    }

    clickPromotionCriteriaDropdown() {
        cy.get(this.dropdownELe).eq(5).click({ force: true })
    }

    selectPromotionCriteriaValue(criteria) {
        cy.get(this.bUDropdownValEle).contains(criteria).click({ force: true })
    }

    enterPromotionConditionValue(value) {
        cy.get(this.txtPromotionConditionVal).eq(0).clear().type(value)
    }

    clickPromotionDisbursementDropdown() {
        cy.get(this.dropdownELe).eq(6).click({ force: true })
    }


    selectPromotionDisbursement(disbursement) {
        cy.get(this.bUDropdownValEle).contains(disbursement).click({ force: true })
    }

    enterPromotionDisbursementValue(value) {
        cy.get(this.txtDisbursementVal).eq(1).clear().type(value)
    }

    getAlertMessage() {
        return cy.get(this.alertMessage)
    }


    checkBusinessUnitValues(desiredBu) {
        cy.get(this.bUDropdownValEle).should("be.visible").wait(1000).each((option) => {
            cy.wrap(option).invoke('text').then((optionText) => {
                cy.log(optionText);
            })
        })
        cy.get(this.bUDropdownValEle).each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredBu[index]);
        });
    }

    checkDropdownValues(value) {
        cy.compareTwoArrayValue(this.bUDropdownValEle,value)
    }



    clickOnDropdown(labelText) {
        cy.contains('label', labelText)
            // Find the parent div with class "sc-hhOBVt" and then find the child div with class "zindex-2__input-container"
            .parents('div.sc-hhOBVt')
            .find('.zindex-2__input-container')
            // Click on the div with class "zindex-2__input-container"
            .click()
    }

    getSelectedValueOfDropdown(labelText) {
       return cy.contains('label', labelText)
            .parents('div.sc-hhOBVt')
            .find('div.zindex-2__single-value')
    }


    enterValueFor(labelText, value) {
        cy.contains('label',labelText)
            .parent('div.form-input')
            .find('[type="text"]')
            .type(value)
    }

}

export const onCreatePromotionPage = new CreatePromotionPage()