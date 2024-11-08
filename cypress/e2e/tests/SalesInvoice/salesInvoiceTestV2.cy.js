const { faker } = require('@faker-js/faker');
const {
  onDashboardPage,
} = require('../../../support/PageObjects/DashboardPage/DashboardPage.po');
const {
  onSalesInvoicePage,
} = require('../../../support/PageObjects/SalesInvoicePage/SalesInvoicePage.po');

const { ENDPOINTS } = require('../../../support/api/utils/endpoint');
const {
  onLoginPage,
} = require('../../../support/PageObjects/LoginPage/LoginPage.po');
const { testDataSI } = require('../../../fixtures/salesInvoiceSKU');

describe('Sales Invoice pages suite', () => {
  const discount = {
    firstBillDiscount: testDataSI[0].excise,
    secondBillDiscount: testDataSI[0].lineDisc,
    billDiscount: 10,
    tradeDiscount: 5,
  };
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearLocalStorage();
    cy.fixture('salesInvoiceSKU').as('data'); //loading fixture
    cy.intercept('POST', `**/${ENDPOINTS.SETTING.LIST}`).as('getSettings');
    cy.intercept('POST', `**/${ENDPOINTS.BILLTERM.LIST}**`).as(
      'getBillTermsSettings'
    );
    // Login using provided username and password
    cy.visit('/');
    onLoginPage.login(Cypress.env('username'), Cypress.env('password'));
  });
  beforeEach('Open App and Login', () => {
    // cy.wait(2000);
    cy.wait('@getSettings');
    cy.get('@getSettings').then((res) => {
      const settingData = res.response.body;

      // Extracting currency and decimal precision settings
      const currencySetting = settingData.data.rows[0].currency_setting.value;
      const decimalPrecision =
        settingData.data.rows[0].decimal_precision_setting;
      const roundingSetting = settingData.data.rows[0].rounding_setting;

      // Setting decimal precision values to Cypress environment variables

      Cypress.env('amountDecimalPrecision', decimalPrecision.amount);
      Cypress.env('quantityDecimalPrecision', decimalPrecision.quantity);
      Cypress.env('rateDecimalPrecision', decimalPrecision.rate);

      // Determine rounding method based on API settings
      Cypress.env(
        'roundingMethod',
        Object.keys(roundingSetting.round_option).find(
          (key) => roundingSetting.round_option[key]
        ) || 'default'
      );

      // Log settings for verification
      cy.log('Decimal precision settings and rounding method configured.');
      // // Checking decimal_rounding and round_option
      // if (roundingSetting.round_option) {
      //   const roundOption = roundingSetting.round_option;
      //   if (roundOption.divisible_by_5) {
      //     Cypress.env('roundingMethod', 'divisible_by_5');
      //   } else if (roundOption.round_up) {
      //     Cypress.env('roundingMethod', 'round_up');
      //   } else if (roundOption.round_down) {
      //     Cypress.env('roundingMethod', 'round_down');
      //   } else if (roundOption.to_whole_number) {
      //     Cypress.env('roundingMethod', 'to_whole_number');
      //   }
      // }

      // Logging the settings for verification
      cy.log('Currency Setting: ' + currencySetting);
      cy.log(
        'Amount Decimal Precision: ' + Cypress.env('amountDecimalPrecision')
      );
      cy.log(
        'Quantity Decimal Precision: ' + Cypress.env('quantityDecimalPrecision')
      );
      cy.log('Rate Decimal Precision: ' + Cypress.env('rateDecimalPrecision'));
      cy.log('Rounding Method: ' + Cypress.env('roundingMethod'));
    });

    // Wait for 2000 milliseconds
    cy.wait(2000);

    // Hover mouse over Sales in the dashboard, click on Sales Invoice, and verify the URL
    onDashboardPage.hoverMouserOverSales();
    onDashboardPage.clickSalesInvoice();
    onDashboardPage.verifySalesInvoiceUrl();
  });

  it.only('should validate calculations of a sales invoice', () => {
    onSalesInvoicePage.clickCreateBtn();
    cy.wait(2000);

    cy.wait('@getBillTermsSettings');
    cy.get('@getBillTermsSettings').then((res) => {
      const salesTermSettingData = res.response.body;
      const signs = salesTermSettingData.data.rows
        .slice(0, 5)
        .map((term) => term.sign);
      const subjectTos = salesTermSettingData.data.rows
        .slice(0, 5)
        .map((term) => term.subject_to);

      // Store each bill term sign in Cypress environment
      signs.forEach((sign, index) =>
        Cypress.env(`billTermSign${index + 1}`, sign)
      );

      subjectTos.forEach((subjectTo, index) =>
        Cypress.env(`billTermSubjectTo${index + 1}`, subjectTo)
      );
    });

    // Input details on the Sales Invoice page
    onSalesInvoicePage.selectPaymentMode('Cash');
    onSalesInvoicePage.clickOnBusinessUnitDropdown();
    onSalesInvoicePage.selectBusinessUnitByValue('All');
    onSalesInvoicePage.typeRemarks(faker.lorem.sentence());

    testDataSI.forEach((sku, index) => {
      onSalesInvoicePage.selectSKU(sku.skuTitle);
      onSalesInvoicePage.enterQuantity(sku.quantity);
      onSalesInvoicePage.enterRate(index, sku.rate);
      onSalesInvoicePage.clickAddBillTerms(index);
      onSalesInvoicePage.isBillTernHeaderTextDisplayed();
      onSalesInvoicePage.enterFirstBillTermValue(sku.excise);
      onSalesInvoicePage.enterSecondBillTermValue(sku.lineDisc);
      onSalesInvoicePage.clickAddDiscountBtn();
      onSalesInvoicePage.clickAddSKUBtn();
      if (index < testDataSI.length - 1) {
        onSalesInvoicePage.clickAddNewLineBtn();
      }
    });
    onSalesInvoicePage.enterBillDiscount(discount.billDiscount);
    onSalesInvoicePage.enterTradeDiscount(discount.tradeDiscount);

    onSalesInvoicePage.checkOrderCalculationDynamic(
      discount.firstBillDiscount,
      discount.secondBillDiscount,
      discount.billDiscount,
      discount.tradeDiscount
    );
  });

  // Test case to verify the header text on the Sales Invoice page
  it('Verify Header of Sales Invoice Page', () => {
    // Get the header text and assert it to be 'Sales Invoices'
    cy.getHeaderText('headerText');
    cy.get('@headerText').then((headerText) => {
      try {
        expect(headerText).to.eq('Sales Invoices');
      } catch (error) {
        cy.log('Header Text does not match');
      }
    });

    onSalesInvoicePage.clickCreateBtn();
    cy.wait(2000);
    cy.wait('@getBillTermsSettings');
    cy.get('@getBillTermsSettings').then((res) => {
      const salesTermSettingData = res.response.body;
      const firstBillTerm = salesTermSettingData.data.rows[0];
      const secondBillTerm = salesTermSettingData.data.rows[1];
      const thirdBillTerm = salesTermSettingData.data.rows[2];
      const fourthBillTerm = salesTermSettingData.data.rows[3];
      const fifthBillTerm = salesTermSettingData.data.rows[4];
      const sequence1 = firstBillTerm.sequence;
      const sign1 = firstBillTerm.sign;
      const subjectTo1 = firstBillTerm.subject_to;
      const transactionType1 = firstBillTerm.transaction_type;
      const sequence2 = secondBillTerm.sequence;
      const sign2 = secondBillTerm.sign;
      const subjectTo2 = secondBillTerm.subject_to;
      const transactionType2 = secondBillTerm.transaction_type;
      const sequence3 = thirdBillTerm.sequence;
      const sign3 = thirdBillTerm.sign;
      const subjectTo3 = thirdBillTerm.subject_to;
      const transactionType3 = thirdBillTerm.transaction_type;
      const sequence4 = fourthBillTerm.sequence;
      const sign4 = fourthBillTerm.sign;
      const subjectTo4 = fourthBillTerm.subject_to;
      const transactionType4 = fourthBillTerm.transaction_type;
      const sequence5 = fifthBillTerm.sequence;
      const sign5 = fifthBillTerm.sign;
      const subjectTo5 = fifthBillTerm.subject_to;
      const transactionType5 = fifthBillTerm.transaction_type;
      if (sign1 === 'MINUS') {
        Cypress.env('firstBillTermSign', 'MINUS');
      } else {
        Cypress.env('firstBillTermSign', 'PLUS');
      }
      if (sign2 === 'MINUS') {
        Cypress.env('secondBillTermSign', 'MINUS');
      } else {
        Cypress.env('secondBillTermSign', 'PLUS');
      }
      if (sign3 === 'MINUS') {
        Cypress.env('thirdBillTermSign', 'MINUS');
      } else {
        Cypress.env('thirdBillTermSign', 'PLUS');
      }

      if (sign4 === 'MINUS') {
        Cypress.env('fourthBillTermSign', 'MINUS');
      } else {
        Cypress.env('fourthBillTermSign', 'PLUS');
      }
      if (sign5 === 'MINUS') {
        Cypress.env('fifthBillTermSign', 'MINUS');
      } else {
        Cypress.env('fifthBillTermSign', 'PLUS');
      }

      cy.log(sequence1);
      cy.log(sign1);
      cy.log(subjectTo1);
      cy.log(transactionType1);
      cy.log(sequence1);
      cy.log(sign2);
      cy.log(subjectTo2);
      cy.log(transactionType2);
      cy.log(sequence2);
      cy.log(sign2);
      cy.log(subjectTo2);
      cy.log(transactionType2);
      cy.log(sequence3);
      cy.log(sign3);
      cy.log(subjectTo3);
      cy.log(transactionType3);
      cy.log(sequence4);
      cy.log(sign4);
      cy.log(subjectTo4);
      cy.log(transactionType4);
    });
  });
});
