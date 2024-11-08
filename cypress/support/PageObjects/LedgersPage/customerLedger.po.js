import { onDashboardPage } from "../DashboardPage/DashboardPage.po";

const labelText = {
  CUSTOMER_LEDGER_NAME: "Customer Ledger Name",
  ASSOCIATE_SUB_LEDGER: "Associate Sub Ledger",
  PAN_NUMBER: "PAN No.",
  OPENING_BALANCE_TYPE: "Opening Balance Type",
  OPENING_BALANCE: "Opening Balance",
  EMAIL: "Email",
  MOBILE_NUMBER: "Mobile No.",
  ADDRESS: "Address",
  CITY: "City",
  AREA: "Area",
  SALES_PERSON: "Sales Person",
  CREDIT_LIMIT: "Credit Limit",
  CREDIT_DAY: "Credit Day",
  BILLING_ADDRESS: "Billing Address",
  SHIPPING_ADDRESS: "Shipping Address",
};

class CustomerLedgerPage {
  visit() {
    onDashboardPage.hoverMouseOverConfiguration();
    onDashboardPage.hoverMouseOverLedger();
    onDashboardPage.openCustomerLedgers();
  }

  clickOnCreateIcon() {
    cy.clickOnCreateIcon();
  }
}

class CreateCustomerLedgerPage {
  // Elements
  validateHeaderText(expectedText) {
    cy.get("header")
      .should("be.visible")
      .invoke("text")
      .then((actualText) => {
        const normalizeActualText = actualText.replace(/\s+/g, " ").trim();
        const normalizeExpectedText = expectedText.trim();
        expect(normalizeActualText).to.equal(normalizeExpectedText);
      });
  }

  // Method to handle typing only if the field value is not empty
  typeIfNotEmpty(selector, value) {
    if (value) {
      cy.get(selector).type(value);
    } else {
      cy.log(`${selector} field is empty; skipping typing.`);
    }
  }

  enterLedgerName(name) {
    this.typeIfNotEmpty('input[name="name"]', name);
  }

  clickOnFieldByLabel(label) {
    cy.get(`label:contains("${label}")`)
      .closest(".form-select-input")
      .find(".zindex-2__control")
      .click({ force: true });
  }

  selectValue(value) {
    cy.get("div.zindex-2__option ").contains(value).click();
  }

  selectSubLedger(subLedger) {
    this.clickOnFieldByLabel(labelText.ASSOCIATE_SUB_LEDGER);
    this.selectValue(subLedger);
  }

  enterPanNo(pan) {
    this.typeIfNotEmpty('input[name="pan"]', pan);
  }

  selectOpeningBalanceType(obType) {
    this.clickOnFieldByLabel(labelText.OPENING_BALANCE_TYPE);
    this.selectValue(obType);
  }

  enterOpeningBalance(balance) {
    this.typeIfNotEmpty('input[name="openingBalanceAmount"]', balance);
  }

  enterEmail(email) {
    this.typeIfNotEmpty('input[name="email"]', email);
  }

  enterMobileNumber(mobileNumber) {
    this.typeIfNotEmpty('input[name="phone"]', mobileNumber);
  }

  enterAddress(address) {
    this.typeIfNotEmpty('input[name="address"]', address);
  }

  enterCity(city) {
    this.typeIfNotEmpty('input[name="city"]', city);
  }

  selectArea(area) {
    this.clickOnFieldByLabel(labelText.AREA);
    this.selectValue(area);
  }

  selectSalesPerson(salesPerson) {
    this.clickOnFieldByLabel(labelText.SALES_PERSON);
    this.selectValue(salesPerson);
  }

  enterCreditLimit(cLimit) {
    this.typeIfNotEmpty("input[name='creditLimit']", cLimit);
  }

  enterCreditDay(cDay) {
    this.typeIfNotEmpty("input[name='creditDay']", cDay);
  }

  enterBillingAddress(billingAddress) {
    this.typeIfNotEmpty("input[name='billingAddress']", billingAddress);
  }

  enterShippingAddress(shippingAddress) {
    this.typeIfNotEmpty("input[name='shippingAddress']", shippingAddress);
  }

  submitForm() {
    cy.get('button[type="submit"]').click();
  }

  getErrorMessageByLabel(label, expectedErrorText) {
    cy.get(`label:contains("${label}")`)
      .closest(".form-input")
      .find(".error-message")
      .invoke("text")
      .then((actualErrorText) => {
        const normalizeActualErrorText = actualErrorText
          .replace(/\s+/g, " ")
          .trim();
        const normalizeExpectedErrorText = expectedErrorText.trim();
        expect(normalizeActualErrorText).to.equal(normalizeExpectedErrorText);
      });
  }

  verifyCustomerLedgerErrorMessage(expectedErrorMessage) {
    this.getErrorMessageByLabel(
      labelText.CUSTOMER_LEDGER_NAME,
      expectedErrorMessage
    );
  }

  verifyOpeningBalanceTypeErrorMessage(expectedErrorMessage) {
    this.getErrorMessageByLabel(
      labelText.OPENING_BALANCE_TYPE,
      expectedErrorMessage
    );
  }

  verifyOpeningBalanceErrorMessage(expectedErrorMessage) {
    this.getErrorMessageByLabel(
      labelText.OPENING_BALANCE,
      expectedErrorMessage
    );
  }

  verifyErrorMessage(message) {
    cy.get(".form-error").should("have.text", message);
  }
}

export const onCustomerLedger = new CustomerLedgerPage();
export const onCreateCustomerLedger = new CreateCustomerLedgerPage();
