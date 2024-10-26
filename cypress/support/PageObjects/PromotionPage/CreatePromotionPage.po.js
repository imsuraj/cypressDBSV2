export class CreatePromotionPage {
  pageheader = "h2";
  btnSave = ":nth-child(2) > .sc-jSUZER > span";
  btnCancel = ":nth-child(1) > .sc-jSUZER > span";

  txtTitle = '.form-input > input[placeholder="Promotion Title"]';
  txtDescription = '.form-input > input[placeholder="Description"]';

  calendarStartDate = '[class="moment"]';
  dateStartDate = ".rdrDayStartOfMonth > .rdrDayNumber > span";
  calendarEndDate =
    ":nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment";
  dateEndDate = ".rdrDayEndOfMonth > .rdrDayNumber > span";

  dropdownELe = '[class="zindex-2__input-container css-ackcql"]';
  bUDropdownValEle = "div.zindex-2__option ";

  txtPromotionConditionVal = '.form-input > input[placeholder="Value"]';
  dropdownPromotionDisbursementType =
    ":nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container";
  txtDisbursementVal = '.form-input > input[placeholder="Value"]';

  alertMessage = ".alert-message";

  getHeaderText() {
    return cy.get(this.pageheader);
  }

  isSaveBtnDisplayed() {
    cy.get(this.btnSave).should("be.visible");
  }

  clickSaveBtn() {
    cy.get(this.btnSave).should("be.visible").click();
  }

  clickCancelBtn() {
    cy.get(this.btnCancel).should("be.visible").click();
  }

  // Generalized method to retrieve error messages based on label, container class, and index
  getErrorMessageByLabelAndContainer(
    label,
    containerClass = ".form-input",
    index = 0
  ) {
    return cy
      .get(`label:contains("${label}")`)
      .eq(index) // Select the specified instance of the label by index
      .closest(containerClass) // Traverse to the specified parent container
      .find(".form-error .error-message") // Find the error message within the container
      .invoke("text")
      .then((text) => cy.wrap(text.trim()));
  }

  // Specific functions for each form field using the generalized method
  getTitleErrorMessage() {
    return this.getErrorMessageByLabelAndContainer("Promotion Title");
  }

  getDescErrorMessage() {
    return this.getErrorMessageByLabelAndContainer("Description");
  }

  getBUErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Business Unit",
      ".form-select-input"
    );
  }

  getBrandErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Brand",
      ".form-select-input"
    );
  }

  getPromotionTypeErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Promotion Type",
      ".form-select-input"
    );
  }

  getPromotionConditionErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Condition",
      ".form-select-input"
    );
  }

  getPromotionCriteriaErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Criteria",
      ".form-select-input"
    );
  }

  getPromotionConditionValErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Value",
      ".form-input-value"
    );
  }

  getPromotionDisbursementTypeErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Disbursement Type",
      ".form-select-input"
    );
  }

  // Using an index of 1 to target the second instance of the "Value" label
  getPromotionDisbursementValErrorMessage() {
    return this.getErrorMessageByLabelAndContainer(
      "Value",
      ".form-input-value",
      1
    );
  }

  enterPromotionTitle(title) {
    cy.get(this.txtTitle).should("be.visible").clear().type(title);
  }

  enterPromotionDescription(description) {
    cy.get(this.txtDescription).should("be.visible").clear().type(description);
  }

  clickOnCalendarByLabel(labelText) {
    return cy
      .contains("label", labelText) // Find the label with the specified text
      .closest(".single-date-picker") // Navigate to the closest parent container
      .find("input") // Find the input element using the placeholder
      .click(); // Click the input to open the calendar
  }

  clickOnStartDateCalendar() {
    this.clickOnCalendarByLabel("Start Date");
  }

  selectStartDate(day) {
    this.clickOnStartDateCalendar();
    cy.wait(2000);
    cy.contains(day) // Find the span that contains the specified day text
      .click({ force: true }); // Click on it to select
  }

  clickOnEndDateCalendar() {
    this.clickOnCalendarByLabel("End Date");
  }

  selectEndDate() {
    this.clickOnEndDateCalendar();
    cy.get(this.dateEndDate).click();
  }

  selectDateFromCalendar(value) {
    cy.get(".rdrDays")
      .find(
        "button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span"
      )
      .contains(value)
      .click();
  }

  clickDropdownByLabel(label, index = 0) {
    return cy
      .get(`label:contains("${label}")`)
      .eq(index) // Select the specified instance of the label by index
      .closest(".form-select-input") // Traverse to the container with the dropdown
      .find(".zindex-2__control") // Find the clickable dropdown container
      .click({ force: true }); // Click the dropdown to open it
  }

  clickBusinessUnitDropdown() {
    this.clickDropdownByLabel("Business Unit");
  }

  selectBusinessUnitValue(buName) {
    cy.get(this.bUDropdownValEle).contains(buName).click({ force: true });
  }

  clickBrandDropdown() {
    this.clickDropdownByLabel("Brand");
  }

  selectBrandValue(brandName) {
    cy.get(this.bUDropdownValEle).contains(brandName).click({ force: true });
  }

  clickSkuDropdown() {
    this.clickDropdownByLabel("SKU");
  }

  selectSkuValue(skuName) {
    cy.get(this.bUDropdownValEle).contains(skuName).click({ force: true });
  }

  clickPromotionTypeDropdown() {
    this.clickDropdownByLabel("Promotion Type");
  }

  selectPromotionTypeValue(promotionType) {
    cy.get(this.bUDropdownValEle)
      .contains(promotionType)
      .click({ force: true });
  }

  clickPromotionConditionDropdown() {
    this.clickDropdownByLabel("Condition");
  }

  selectPromotionConditionValue(condition) {
    cy.get(this.bUDropdownValEle).contains(condition).click({ force: true });
  }

  clickPromotionCriteriaDropdown() {
    this.clickDropdownByLabel("Criteria");
  }

  selectPromotionCriteriaValue(criteria) {
    cy.get(this.bUDropdownValEle).contains(criteria).click({ force: true });
  }

  enterPromotionConditionValue(value) {
    cy.get(this.txtPromotionConditionVal).eq(0).clear().type(value);
  }

  clickPromotionDisbursementDropdown() {
    this.clickDropdownByLabel("Disbursement Type");
  }

  selectPromotionDisbursement(disbursement) {
    cy.get(this.bUDropdownValEle).contains(disbursement).click({ force: true });
  }

  enterPromotionDisbursementValue(value) {
    cy.get(this.txtDisbursementVal).eq(1).clear().type(value);
  }

  getAlertMessage() {
    return cy.get(this.alertMessage);
  }

  checkBusinessUnitValues(desiredBu) {
    cy.get(this.bUDropdownValEle)
      .should("be.visible")
      .wait(1000)
      .each((option) => {
        cy.wrap(option)
          .invoke("text")
          .then((optionText) => {
            cy.log(optionText);
          });
      });
    cy.get(this.bUDropdownValEle).each((option, index) => {
      cy.wrap(option).invoke("text").should("eq", desiredBu[index]);
    });
  }

  checkDropdownValues(value) {
    cy.compareTwoArrayValue(this.bUDropdownValEle, value);
  }

  clickOnDropdown(labelText) {
    cy.contains("label", labelText)
      // Find the parent div with class "sc-hhOBVt" and then find the child div with class "zindex-2__input-container"
      .parents("div.sc-hhOBVt")
      .find(".zindex-2__input-container")
      // Click on the div with class "zindex-2__input-container"
      .click();
  }

  getSelectedValueOfDropdown(labelText) {
    return cy
      .contains("label", labelText)
      .parents("div.sc-hhOBVt")
      .find("div.zindex-2__single-value");
  }

  enterValueFor(labelText, value) {
    cy.contains("label", labelText)
      .parent("div.form-input")
      .find('[type="text"]')
      .type(value);
  }
}

export const onCreatePromotionPage = new CreatePromotionPage();
