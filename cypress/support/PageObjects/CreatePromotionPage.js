class CreatePromotion {
    pageheader = "h2"
    btnSave = ":nth-child(2) > .sc-jSUZER > span"
    btnCancel = ":nth-child(1) > .sc-jSUZER > span"
    errPromotionTitle = ".col-lg-12 > .form-input > .sc-hHTYSt > .error-message"
    errPromotionDesc = ":nth-child(2) > :nth-child(1) > .form-input > .sc-hHTYSt > .error-message"
    errBU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    errBrand = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    errPromotionType = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    erroCondition = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    errorCriteria = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    errConditionVal = ":nth-child(4) > .form-input > .sc-hHTYSt > .error-message"
    errDisbursementType = ":nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message"
    errDisbursementVal = ":nth-child(2) > .form-input > .sc-hHTYSt > .error-message"

    txtTitle = ".col-lg-12 > .form-input > .sc-idXgbr"
    txtDescription = ":nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr"

    calendarStartDate = ":nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment"
    dateStartDate = ".rdrDayStartOfMonth > .rdrDayNumber > span"
    calendarEndDate = ":nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment"
    dateEndDate = ".rdrDayEndOfMonth > .rdrDayNumber > span"

    dropdownBU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownBrand = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownSKU = ":nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownPromotionType = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    dropdownPromotionCondition = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    dropdownPromotionCriteria = ":nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    txtPromotionConditionVal = ":nth-child(4) > .form-input > .sc-idXgbr"
    dropdownPromotionDisbursementType = ":nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container"
    txtDisbursementVal = ":nth-child(2) > .form-input > .sc-idXgbr"

    alertMessage = ".alert-message"





    getHeaderText() {
        return cy.get(this.pageheader)
    }

    isSaveBtnDisplayed (){
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
        cy.get(this.txtTitle).type(title)
    }

    enterPromotionDescription(description) {
        cy.get(this.txtDescription).type(description)
    }

    selectStartDate() {
        cy.get(this.calendarStartDate).click()
        cy.get(this.dateStartDate).click()
    }


    selectEndDate() {
        cy.get(this.calendarEndDate).click()
        cy.get(this.dateEndDate).click()
    }


    selectBUValue(buName) {
        cy.get(this.dropdownBU).click()
        cy.selectDropdownValue(buName)
    }

    selectBrandValue(brandName) {
        cy.get(this.dropdownBrand).click()
        cy.selectDropdownValue(brandName)
    }


    selectSkuValue(skuName) {
        cy.get(this.dropdownSKU).click()
        cy.selectDropdownValue(skuName)
    }

    selectPromotionType(promotionType) {
        cy.get(this.dropdownPromotionType).click()
        cy.selectDropdownValue(promotionType)
    }

    selectPromotionCondition(condition) {
        cy.get(this.dropdownPromotionCondition).click()
        cy.selectDropdownValue(condition)
    }


    selectPromotionCriteria(criteria) {
        cy.get(this.dropdownPromotionCriteria).click()
        cy.selectDropdownValue(criteria)
    }

    enterPromotionConditionValue(value) {
        cy.get(this.txtPromotionConditionVal).type(value)
    }

    selectPromotionDisbursement(disbursement) {
        cy.get(this.dropdownPromotionDisbursementType).click()
        cy.selectDropdownValue(disbursement)
    }

    enterPromotionDisbursementValue(value) {
        cy.get(this.txtDisbursementVal).type(value)
    }

    getAlertMessage () {
        return cy.get(this.alertMessage)
    }

}

export default CreatePromotion;