const {
  createCustomerLedgerValidationCases,
} = require("../../../../fixtures/testData");

const {
  onCustomerLedger,
  onCreateCustomerLedger,
} = require("../../../../support/PageObjects/LedgersPage/customerLedger.po");

describe("Customer Ledger Page test", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/");
    onCustomerLedger.visit();
    onCustomerLedger.clickOnCreateIcon();
    onCreateCustomerLedger.validateHeaderText("Create Customer Ledger");
  });

  // Test for minimum boundary values
  it("should allow minimum boundary values", () => {
    const data = createCustomerLedgerValidationCases.minValues;
    onCreateCustomerLedger.enterLedgerName(data.customerLedgerName);
    onCreateCustomerLedger.selectSubLedger(data.associateSubLedger);
    onCreateCustomerLedger.enterPanNo(data.panNumber);
    onCreateCustomerLedger.selectOpeningBalanceType(data.openingBalanceType);
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterEmail(data.email);
    onCreateCustomerLedger.enterMobileNumber(data.mobileNumber);
    onCreateCustomerLedger.enterAddress(data.address);
    onCreateCustomerLedger.enterCity(data.city);
    onCreateCustomerLedger.selectArea(data.area);
    onCreateCustomerLedger.selectSalesPerson(data.salesPerson);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    onCreateCustomerLedger.enterBillingAddress(data.billingAddress);
    onCreateCustomerLedger.enterShippingAddress(data.shippingAddress);
    // onCreateCustomerLedger.submitForm();
    // onCreateCustomerLedger.verifySubmissionSuccess(); // Assume this verifies a successful submission message
  });

  // Test for maximum boundary values
  it("should allow maximum boundary values", () => {
    const data = createCustomerLedgerValidationCases.maxValues;
    onCreateCustomerLedger.enterLedgerName(data.customerLedgerName);
    onCreateCustomerLedger.selectSubLedger(data.associateSubLedger);
    onCreateCustomerLedger.enterPanNo(data.panNumber);
    onCreateCustomerLedger.selectOpeningBalanceType(data.openingBalanceType);
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterEmail(data.email);
    onCreateCustomerLedger.enterMobileNumber(data.mobileNumber);
    onCreateCustomerLedger.enterAddress(data.address);
    onCreateCustomerLedger.enterCity(data.city);
    onCreateCustomerLedger.selectArea(data.area);
    onCreateCustomerLedger.selectSalesPerson(data.salesPerson);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    onCreateCustomerLedger.enterBillingAddress(data.billingAddress);
    onCreateCustomerLedger.enterShippingAddress(data.shippingAddress);
    // onCreateCustomerLedger.submitForm();
    // onCreateCustomerLedger.verifySubmissionSuccess();
  });

  // Test for below minimum values
  it("should show validation errors for below minimum values", () => {
    const data = createCustomerLedgerValidationCases.belowMinValues;
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    // onCreateCustomerLedger.submitForm();
    // onCreateCustomerLedger.verifyValidationError(
    //   "Opening balance must be at least 2000"
    // );
    // onCreateCustomerLedger.verifyValidationError(
    //   "Credit limit must be at least 5000"
    // );
    // onCreateCustomerLedger.verifyValidationError(
    //   "Credit day must be at least 7"
    // );
  });

  // Test for above maximum values
  it("should show validation errors for above maximum values", () => {
    const data = createCustomerLedgerValidationCases.aboveMaxValues;
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    // onCreateCustomerLedger.submitForm();
    // onCreateCustomerLedger.verifyValidationError(
    //   "Opening balance cannot exceed 4000"
    // );
    // onCreateCustomerLedger.verifyValidationError(
    //   "Credit limit cannot exceed 10000"
    // );
    // onCreateCustomerLedger.verifyValidationError("Credit day cannot exceed 14");
  });

  // Test for invalid formats
  it("should show validation errors for invalid formats", () => {
    const data = createCustomerLedgerValidationCases.invalidFormats;
    onCreateCustomerLedger.enterEmail(data.email);
    onCreateCustomerLedger.enterMobileNumber(data.mobileNumber);
    onCreateCustomerLedger.enterPanNo(data.panNumber);
    onCreateCustomerLedger.submitForm();
    // onCreateCustomerLedger.verifyValidationError("Invalid email format");
    // onCreateCustomerLedger.verifyValidationError(
    //   "Invalid mobile number format"
    // );
    // onCreateCustomerLedger.verifyValidationError("Invalid PAN format");
  });

  it.only("should show validation errors for exceeding max allowed limits", () => {
    const data = createCustomerLedgerValidationCases.exceedMaxValues;
    onCreateCustomerLedger.enterLedgerName(data.customerLedgerName);
    onCreateCustomerLedger.selectSubLedger(data.associateSubLedger);
    onCreateCustomerLedger.enterPanNo(data.panNumber);
    onCreateCustomerLedger.selectOpeningBalanceType(data.openingBalanceType);
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterEmail(data.email);
    onCreateCustomerLedger.enterMobileNumber(data.mobileNumber);
    onCreateCustomerLedger.enterAddress(data.address);
    onCreateCustomerLedger.enterCity(data.city);
    onCreateCustomerLedger.selectArea(data.area);
    onCreateCustomerLedger.selectSalesPerson(data.salesPerson);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    onCreateCustomerLedger.enterBillingAddress(data.billingAddress);
    onCreateCustomerLedger.enterShippingAddress(data.shippingAddress);
    // onCreateCustomerLedger.verifyValidationError("Invalid email format");
    // onCreateCustomerLedger.verifyValidationError(
    //   "Invalid mobile number format"
    // );
    // onCreateCustomerLedger.verifyValidationError("Invalid PAN format");
  });

  // Test for required empty fields
  it("should show validation errors for required empty fields", () => {
    const data = createCustomerLedgerValidationCases.emptyFields;
    onCreateCustomerLedger.enterLedgerName(data.customerLedgerName);
    onCreateCustomerLedger.enterPanNo(data.panNumber);
    onCreateCustomerLedger.enterEmail(data.email);
    onCreateCustomerLedger.enterOpeningBalance(data.openingBalance);
    onCreateCustomerLedger.enterCreditLimit(data.creditLimit);
    onCreateCustomerLedger.enterCreditDay(data.creditDay);
    onCreateCustomerLedger.submitForm();
    onCreateCustomerLedger.verifyCustomerLedgerErrorMessage("Name is required");
    onCreateCustomerLedger.verifyOpeningBalanceTypeErrorMessage(
      "Opening Balance Type is required"
    );
    onCreateCustomerLedger.verifyOpeningBalanceErrorMessage(
      "Opening Balance is required"
    );
  });
});
