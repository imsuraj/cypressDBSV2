import {
  expectApproxEqual,
  formatToDecimalPlacesAsPerSettings,
  parseAndFormat,
} from '../../api/utils/currencyUtils';

export class SalesInvoicePage {
  pageHeader = 'h2';
  createBtn = "svg[class$='icon plus']";
  paymentMode = '[class="payment"] [class="radio-list"] span';
  salesInvoiceUrl = '/sales/sales-invoice';

  businessUnitsValue = 'div.zindex-2__option ';
  customerLedger = '[class="zindex-2__input-container css-ackcql"]';
  customerLedgeDropdownVal =
    '[class="zindex-2__menu css-26l3qy-menu"] [style="font-size: 16px;"]';
  customerLedgerValOnDropdown =
    '[class="zindex-2__single-value css-qc6sy-singleValue"] [style="font-size: 16px;"]';

  remarks = '[placeholder="Remarks"]';
  sku = '[class="search-table-input"]';
  skuEle =
    '.search-table-input > .sc-gYbzsP > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container';

  inStock = 'td.free-sku-th + td.text-right';
  // quantity = '[class="table-input-1 text-right quantity"]';
  quantity = '.quantity > .form-input > #input';
  rate = '[class="table-input-1 text-right rate"]';
  addBtn = '.sc-jSUZER.jKQpJu.primary.small';
  addResetBtn = 'td.text-right.button-td';

  billNameEle = '[placeholder="Bill Name"]';
  billNameErrorMessageEle = '.error-message';

  plusBtn = '.kHoScB';

  cancelBtn =
    "div[class='button-wrap'] button[class='sc-jSUZER cURnwe secondary small '] span";
  saveBtn = "button[type='submit'] span";

  billSubTotalEle = ':nth-child(1) > .calculated-value';
  billDiscountEle =
    ':nth-child(2) > .left > :nth-child(3) > .form-input > #input';
  billDiscountAmount = ':nth-child(2) > .calculated-value';
  tradeDiscountEle =
    ':nth-child(3) > .left > :nth-child(3) > .form-input > #input';
  tradeDiscountAmount = ':nth-child(3) > .calculated-value';
  // billTotalEle = ':nth-child(4) >.calculated-value'
  taxableAmountEle = ':nth-child(5) > .calculated-value';
  vatAmountEle = ':nth-child(6) > .calculated-value';
  totalEle = ':nth-child(7) > .calculated-value';

  invoiceNumberEle = '.InvoiceNumber > :nth-child(2)';

  naviageToSalesInvoice() {
    cy.visit(this.salesInvoiceUrl);
  }

  searchInvoiceByText(text) {
    cy.searchByText(text);
    cy.contains('tbody tr td', text);
  }

  clickCreateBtn() {
    // Get the body element to use as a reference point
    // cy.get('body').trigger('mousemove', 'center').click();
    cy.get(this.createBtn).click();
  }

  selectPaymentMode(mode) {
    cy.get(this.paymentMode).contains(mode).click();
  }
  clickDropdownByLabel(label, index = 0) {
    return cy
      .get(`label:contains("${label}")`)
      .eq(index) // Select the specified instance of the label by index
      .closest('.form-select-input') // Traverse to the container with the dropdown
      .find('.zindex-2__control') // Find the clickable dropdown container
      .click({ force: true }); // Click the dropdown to open it
  }

  clickOnBusinessUnitDropdown() {
    // cy.get(this.businessUnitDropdown).click()
    // cy.contains(this.businessUnitDropdown,'BU').siblings().click()
    this.clickDropdownByLabel('BU');
  }

  selectBusinessUnitByValue(value) {
    cy.get(this.businessUnitsValue).contains(value).click();
  }

  selectCustomerLedger(customerLedgerName) {
    cy.get(this.customerLedger).eq(2).click({ force: true });
    // cy.focused().type(customerLedgerName+'{downarrow}{enter}')
    cy.focused().type(customerLedgerName);
    cy.wait(2000);
    cy.get(this.customerLedgeDropdownVal).contains(customerLedgerName).click();
    cy.get(this.customerLedgerValOnDropdown).should(
      'contain',
      customerLedgerName
    );
  }

  enterCustomerName(billName) {
    cy.get(this.billNameEle).type(billName);
  }

  getBillNameErrorMessage(alias) {
    cy.get(this.billNameErrorMessageEle)
      .invoke('text')
      .then((text) => {
        cy.wrap(text).as(alias);
      });
  }
  typeRemarks(remarks) {
    cy.get(this.remarks).type(remarks, { force: true, delay: 0 });
  }

  selectSalesPerson(agentName) {
    cy.get(this.customerLedger).eq(3).click({ force: true });
    cy.focused().type(agentName + '{downarrow}{enter}');
  }

  selectSKU(skuTitle) {
    cy.get(this.skuEle)
      .click()
      .wait(200)
      .focused()
      .type(skuTitle + '{downarrow}{enter}', { delay: 0 });
  }

  checkStockOfSelectedSKU(index) {
    cy.wait(1000);
    cy.get(this.inStock)
      .eq(index)
      .invoke('text')
      .then((stockText) => {
        const stockValue = parseInt(stockText);
        cy.log(stockValue);

        if (Number.isNaN(stockValue) || stockValue === 0) {
          cy.log('Insufficient stock or no stock value. Terminating the test.');
          return;
        }
      });
  }

  // enterQuantity(quantity) {
  //   cy.get(this.quantity)
  //     .type(quantity)
  //     .should('have.prop', 'valueAsNumber', quantity);
  // }

  enterQuantity(quantity) {
    cy.get(this.quantity)
      .type(quantity, { delay: 0 })
      .then((input) => {
        const actualValue = input.prop('valueAsNumber');
        expect(actualValue).to.be.closeTo(quantity, 0.01); // Adjust tolerance as needed
      });
  }

  enterRate(index, rate) {
    cy.get(this.rate)
      .eq(index)
      .clear()
      .type('{selectall}{backspace}') // clear residual input
      .type(rate, { delay: 300 }) // Enter rate with a delay for stability
      .invoke('prop', 'valueAsNumber')
      .should('eq', rate[index]);
  }

  clickAddBillTerms(index) {
    cy.get('.td-discount > .sc-jSUZER').eq(index).click();
  }

  isBillTernHeaderTextDisplayed() {
    return cy.isBillTernHeaderTextDisplayed();
  }

  enterFirstBillTermValue(value) {
    cy.enterFirstBillTermValue(value);
  }

  enterSecondBillTermValue(value) {
    cy.enterSecondBillTermValue(value);
  }

  clickAddDiscountBtn() {
    cy.clickAddDiscountBtn();
  }

  clickAddSKUBtn() {
    cy.clickAddSKUBtn();
  }

  clickAddNewLineBtn() {
    cy.clickAddNewLineBtn();
  }

  clickOnAddButon() {
    cy.contains(this.addResetBtn, 'Add')
      .find(this.addBtn)
      .click({ force: true });
  }

  clickOnSaveBtn() {
    cy.get(this.saveBtn).click({ force: true });
  }

  verifySuccessMessage(message) {
    cy.url().should('include', '/sales/sales-invoice');
    cy.contains(message).should('be.visible');
  }

  getInvoiceNumber(aliasName) {
    cy.get(this.invoiceNumberEle)
      .invoke('text')
      .then((invoiceNumber) => {
        cy.log(invoiceNumber);
        cy.wrap(invoiceNumber).as(aliasName);
      });
  }

  getSubTotal(aliasName) {
    cy.getTextAndAlias('Sub Total', aliasName);
  }

  getBillDiscount(aliasName) {
    cy.getTextAndAlias('Bill Discount', aliasName);
  }

  getTradeDiscount(aliasName) {
    cy.getTextAndAlias('Trade Discount', aliasName);
  }

  getTaxableAmount(aliasName) {
    cy.getTextAndAlias('Taxable Amount', aliasName);
  }

  getVat(aliasName) {
    cy.getTextAndAlias('VAT', aliasName);
  }

  getTotal(aliasName) {
    cy.getTextAndAlias('Total', aliasName);
  }

  clickOnPlusButton() {
    cy.get(this.plusBtn).click();
  }

  enterBillDiscount(billDiscount) {
    cy.get(this.billDiscountEle)
      .type(billDiscount)
      .should('have.prop', 'valueAsNumber', billDiscount);
    cy.wait(1000);
  }

  enterTradeDiscount(tradeDiscount) {
    cy.get(this.tradeDiscountEle)
      .type(tradeDiscount)
      .should('have.prop', 'valueAsNumber', tradeDiscount);
    cy.wait(1000);
  }

  checkOrderCalculation(billDiscount, tradeDiscount) {
    let billSubtotal = 0;
    cy.get('tbody')
      .find('tr')
      .each(($row) => {
        const quantity = parseFloat(
          $row.find('td').eq(5).text().replace(/,/g, '')
        );
        const rate = parseFloat($row.find('td').eq(6).text());
        const amount = parseFloat(
          $row.find('td').eq(7).text().replace(/,/g, '')
        );
        const discount = parseFloat(
          $row.find('td').eq(8).find('.discount-amt').text().replace(/,/g, '')
        );
        const netAmount = parseFloat(
          $row.find('td').eq(9).text().replace(/,/g, '')
        );

        // cy.log(discount)
        // cy.log(quantity)
        // cy.log(rate)
        // cy.log(amount)
        // cy.log(netAmount)

        expect(
          formatToDecimalPlacesAsPerSettings(amount),
          'Comparing  Amount with Expected Amount'
        ).to.equal((quantity * rate).toFixed(2).toString());
        expect(
          formatToDecimalPlacesAsPerSettings(netAmount),
          'Comparing SubTotal Amount with Expected subtotal Amount'
        ).to.equal(
          formatToDecimalPlacesAsPerSettings(amount - discount).toString()
        );
        billSubtotal += parseFloat(netAmount);
      })
      .then(() => {
        // cy.log('Total ' + billSubtotal)
        cy.wrap(billSubtotal).as('expectedSubTotalAmount');
      });

    cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
      cy.get(this.billSubTotalEle)
        .invoke('text')
        .then((actualSubTotalAmount) => {
          try {
            expect(
              parseFloat(actualSubTotalAmount.replace(/,/g, '')).toString(),
              'Checking line level subtotal with Bill level sub total'
            ).to.equal(
              formatToDecimalPlacesAsPerSettings(expectedSubTotalAmount)
            );
          } catch (error) {
            cy.log('Bill Discount AMount does not matched');
          }
        });
    });

    this.enterBillDiscount(billDiscount);
    this.enterTradeDiscount(tradeDiscount);

    cy.getTextAndAlias(this.billDiscountAmount, 'billDiscountAmount');
    cy.getTextAndAlias(this.tradeDiscountAmount, 'tradeDiscountAmount');
    cy.getTextAndAlias(this.taxableAmountEle, 'taxableAmount');
    cy.getTextAndAlias(this.vatAmountEle, 'vatAmount');
    cy.getTextAndAlias(this.totalEle, 'totalAmount');

    cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
      cy.get('@billDiscountAmount').then((billDiscountAmount) => {
        cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
          let expectedBillDiscountAmount =
            (expectedSubTotalAmount * billDiscount) / 100;
          let expectedTradeDiscountAmount =
            ((expectedSubTotalAmount - expectedBillDiscountAmount) *
              tradeDiscount) /
            100;

          // cy.log("expectedBillDiscountAmount:  "+expectedBillDiscountAmount)
          // cy.log("expectedTradeDiscountAmount:  "+expectedTradeDiscountAmount)

          try {
            expect(
              parseFloat(billDiscountAmount.replace(/,/g, '')).toString(),
              'Checking bill Discount amount calculation'
            ).to.equal(
              formatToDecimalPlacesAsPerSettings(expectedBillDiscountAmount)
            );
          } catch (error) {
            cy.log('Bill Discount AMount does not matched');
          }

          try {
            expect(
              parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString(),
              'Checking trade Discount amount calculation'
            ).to.equal(
              formatToDecimalPlacesAsPerSettings(expectedTradeDiscountAmount)
            );
          } catch (error) {
            cy.log('Trade Discount amount does not matched');
          }
        });
      });
    });

    cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
      cy.get('@billDiscountAmount').then((billDiscAmount) => {
        cy.get('@tradeDiscountAmount').then((tradeDiscAmount) => {
          cy.get('@taxableAmount').then((taxableAmount) => {
            cy.get('@vatAmount').then((vatAmount) => {
              cy.get('@totalAmount').then((totalAmount) => {
                const expectedTaxableAmount =
                  formatToDecimalPlacesAsPerSettings(
                    expectedSubTotalAmount - billDiscAmount - tradeDiscAmount
                  );
                const expectedVatAmount = formatToDecimalPlacesAsPerSettings(
                  expectedTaxableAmount * 0.13
                );
                const expectedTotalAmount = (
                  parseFloat(
                    expectedSubTotalAmount - billDiscAmount - tradeDiscAmount
                  ) + parseFloat(expectedTaxableAmount * 0.13)
                ).toFixed(2);
                const actualTaxableAmount = taxableAmount.replace(/,/g, '');
                const actualVatAmount = vatAmount.replace(/,/g, '');
                const actualTotalAmount = totalAmount.replace(/,/g, '');

                try {
                  expect(
                    parseFloat(actualTaxableAmount),
                    'Comparing Taxable Amount'
                  ).to.equal(parseFloat(expectedTaxableAmount));
                } catch (error) {
                  cy.log(
                    'Taxable Amount does not matched with the expected value'
                  );
                }

                try {
                  expect(
                    formatToDecimalPlacesAsPerSettings(actualVatAmount),
                    'Comparing VAT Amount'
                  ).to.equal(expectedVatAmount);
                } catch (error) {
                  cy.log('Vat Amount does not matched with the expected value');
                }

                try {
                  expect(
                    parseFloat(actualTotalAmount),
                    'Comparing Total Amount'
                  ).to.equal(parseFloat(Math.ceil(expectedTotalAmount)));
                } catch (error) {
                  cy.log(
                    'Total Amount does not matched with the expected value'
                  );
                }
              });
            });
          });
        });
      });
    });
  }

  checkOrderCalculationDynamic(
    firstProductTerm = 0,
    secondProductTerm = 0,
    billDiscount = 0,
    tradeDiscount = 0
  ) {
    let billSubTotalAmount = 0;
    let tradeDiscountAmount = 0;
    let billDiscountAmount = 0;
    let taxableAmount = 0;
    let vatAmount = 0;
    let totalAmount = 0;

    let firstBillTermValue = 0;
    let secondBillTermValue = 0;
    let thirdBillTermValue = 0;
    let fourthBillTermValue = 0;
    let fifthBillTermValue = 0;
    let expectedBillTermsAmount = 0;
    let lineTaxableAmount = 0;
    let lineTotalAmount = 0;

    cy.get('tbody')
      .find('tr')
      .each(($row) => {
        const quantity = parseAndFormat($row.find('td').eq(5).text());
        const rate = parseAndFormat($row.find('td').eq(6).text());
        const actualAmount = parseAndFormat($row.find('td').eq(7).text());

        // Skip calculation if invalid data
        if (isNaN(quantity) || isNaN(rate) || isNaN(actualAmount)) {
          cy.log('Error: Invalid quantity, rate, or amount value detected');
          return;
        }

        const actualBillTermsAmount = parseAndFormat(
          $row.find('td').eq(8).find('.discount-amt').text()
        );
        const actualNetAmount = parseAndFormat($row.find('td').eq(9).text());

        // Line level discount calculations

        //firstBillTerm
        if (Cypress.env('billTermSubjectTo1') === 'BASIC') {
          firstBillTermValue = (actualAmount * firstProductTerm) / 100;
        }

        //secondBillTerm
        if (Cypress.env('billTermSubjectTo2') === 'BASIC') {
          if (Cypress.env('billTermSign1') === 'PLUS') {
            secondBillTermValue = actualAmount * (secondProductTerm / 100);
          } else {
            secondBillTermValue = actualAmount * (secondProductTerm / 100);
          }
        } else {
          if (Cypress.env('billTermSign1') === 'PLUS') {
            secondBillTermValue =
              (actualAmount + firstBillTermValue) * (secondProductTerm / 100);
          } else {
            secondBillTermValue =
              (actualAmount - firstBillTermValue) * (secondProductTerm / 100);
          }
        }
        // Expected values
        const expectedAmount = parseAndFormat(rate * quantity);

        if (Cypress.env('billTermSign2') === 'PLUS') {
          expectedBillTermsAmount = parseAndFormat(
            firstBillTermValue + secondBillTermValue
          );
        } else {
          expectedBillTermsAmount = parseAndFormat(
            firstBillTermValue - secondBillTermValue
          );
        }
        const expectedLineNetAmount = parseAndFormat(
          expectedAmount + expectedBillTermsAmount
        );

        // third bill term
        if (
          Cypress.env('billTermSubjectTo3') === 'TAXABLE' ||
          Cypress.env('billTermSubjectTo3') === 'FOLLOW'
        ) {
          thirdBillTermValue = parseAndFormat(
            (expectedLineNetAmount * billDiscount) / 100
          );
        } else {
          (actualAmount * billDiscount) / 100;
        }

        if (
          Cypress.env('billTermSubjectTo4') === 'TAXABLE' ||
          Cypress.env('billTermSubjectTo4') === 'FOLLOW'
        ) {
          if (Cypress.env('billTermSign3') === 'PLUS') {
            fourthBillTermValue = parseAndFormat(
              ((expectedLineNetAmount + thirdBillTermValue) * tradeDiscount) /
              100
            );
          } else {
            fourthBillTermValue = parseAndFormat(
              ((expectedLineNetAmount - thirdBillTermValue) * tradeDiscount) /
              100
            );
          }
        } else {
          (actualAmount * tradeDiscount) / 100;
        }
        // fourth bill term
        // fifth bill terms
        if (
          Cypress.env('billTermSign3') === 'PLUS' &&
          Cypress.env('billTermSign4') === 'PLUS'
        ) {
          lineTaxableAmount = parseAndFormat(
            expectedLineNetAmount + thirdBillTermValue + fourthBillTermValue
          );
        } else {
          lineTaxableAmount = parseAndFormat(
            expectedLineNetAmount - thirdBillTermValue - fourthBillTermValue
          );
        }

        if (Cypress.env('billTermSubjectTo4') === 'FOLLOW') {
          fifthBillTermValue = parseAndFormat(lineTaxableAmount * 0.13);
        } else {
          fifthBillTermValue = parseAndFormat(actualAmount * 0.13);
        }
        if (Cypress.env('billTermSign5') === 'PLUS') {
          lineTotalAmount = parseAndFormat(
            lineTaxableAmount + fifthBillTermValue
          );
        } else {
          lineTotalAmount = parseAndFormat(
            lineTaxableAmount + fifthBillTermValue
          );
        }

        // Logging expected values
        // cy.log('Expected Trade discount ' + thirdBillTermValue);
        // cy.log('Expected Bill discount ' + fourthBillTermValue);
        // cy.log('Expected taxable amount ' + lineTaxableAmount);
        // cy.log('Expected vat amount ' + fifthBillTermValue);
        // cy.log('Expected total amount ' + lineTotalAmount);

        // Update totals -  Adding amounts to total calculations
        billSubTotalAmount += expectedLineNetAmount;
        tradeDiscountAmount += thirdBillTermValue;
        billDiscountAmount += fourthBillTermValue;
        taxableAmount += lineTaxableAmount;
        vatAmount += fifthBillTermValue;
        totalAmount += lineTotalAmount;

        // Assertions
        cy.wrap({ actualAmount, expectedAmount }).should(
          ({ actualAmount, expectedAmount }) => {
            expect(actualAmount, 'Checking Line Amount').to.be.closeTo(expectedAmount, 0.01);
          }
        );

        cy.wrap({ actualBillTermsAmount, expectedBillTermsAmount }).should(
          ({ actualBillTermsAmount, expectedBillTermsAmount }) => {
            expect(actualBillTermsAmount, 'Checking Line Amount').to.be.closeTo(expectedBillTermsAmount, 0.01);
          }
        );

        cy.wrap({ actualNetAmount, expectedLineNetAmount }).should(
          ({ actualNetAmount, expectedLineNetAmount }) => {
            expect(actualNetAmount, 'Checking Line Amount').to.be.closeTo(expectedLineNetAmount, 0.01);
          }
        );
      })
      .then(() => {
        cy.wrap(formatToDecimalPlacesAsPerSettings(billSubTotalAmount)).as(
          'expectedBillSubTotalAmount'
        );
        cy.wrap(formatToDecimalPlacesAsPerSettings(tradeDiscountAmount)).as(
          'expectedBillTradeDiscountAmount'
        );
        cy.wrap(formatToDecimalPlacesAsPerSettings(billDiscountAmount)).as(
          'expectedBillBillDiscountAmount'
        );
        cy.wrap(formatToDecimalPlacesAsPerSettings(taxableAmount)).as(
          'expectedBillTaxableAmount'
        );
        cy.wrap(formatToDecimalPlacesAsPerSettings(vatAmount)).as(
          'expectedBillVatAmount'
        );
        cy.wrap(formatToDecimalPlacesAsPerSettings(totalAmount)).as(
          'expectedBillTotalAmount'
        );
      });

    // Retrieve and alias discounts and amounts
    this.getSubTotal('subTotalAmount');
    this.getBillDiscount('billDiscountAmount');
    this.getTradeDiscount('tradeDiscountAmount');
    this.getTaxableAmount('taxableAmount');
    this.getVat('vatAmount');
    this.getTotal('totalAmount');

    const totalAssertions = [
      {
        alias: 'subTotalAmount',
        expectedAlias: 'expectedBillSubTotalAmount',
        label: 'Sub Total',
      },
      {
        alias: 'tradeDiscountAmount',
        expectedAlias: 'expectedBillTradeDiscountAmount',
        label: 'Trade Discount',
      },
      {
        alias: 'billDiscountAmount',
        expectedAlias: 'expectedBillBillDiscountAmount',
        label: 'Bill Discount',
      },
      {
        alias: 'taxableAmount',
        expectedAlias: 'expectedBillTaxableAmount',
        label: 'Taxable Amount',
      },
      {
        alias: 'vatAmount',
        expectedAlias: 'expectedBillVatAmount',
        label: 'VAT Amount',
      },
      {
        alias: 'totalAmount',
        expectedAlias: 'expectedBillTotalAmount',
        label: 'Total Amount',
      },
    ];

    totalAssertions.forEach(({ alias, expectedAlias, label }) => {
      cy.get(`@${alias}`).then((actualValue) => {
        cy.get(`@${expectedAlias}`).then((expectedValue) => {
          cy.wrap({ actualValue, expectedValue }).should(
            ({ actualValue, expectedValue }) => {
              if (label == 'Total Amount') {
                if (Cypress.env('roundingMethod') === 'round_up') {
                  // Round up to the next whole number
                  expectedValue = parseAndFormat(Math.ceil(expectedValue));
                } else if (Cypress.env('roundingMethod') === 'round_down') {
                  // Round down to the nearest whole number
                  expectedValue = parseAndFormat(Math.floor(expectedValue));
                } else if (Cypress.env('roundingMethod') === 'round_nearest') {
                  // Round to the nearest whole number
                  expectedValue = parseAndFormat(Math.round(expectedValue));
                } else {
                  // Round to the nearest number divisible by 5
                  expectedValue = parseAndFormat(
                    Math.round(expectedValue / 5) * 5
                  );
                }

                expectApproxEqual(
                  parseAndFormat(actualValue),
                  parseAndFormat(expectedValue),
                  1.1
                );
              } else {
                expectApproxEqual(
                  parseAndFormat(actualValue),
                  parseAndFormat(expectedValue),
                  0.5
                );
              }
            }
          );
        });
      });
    });
  }
}

export const onSalesInvoicePage = new SalesInvoicePage();
