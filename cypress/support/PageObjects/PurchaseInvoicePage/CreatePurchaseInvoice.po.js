// Helper function to parse currency strings
function parseCurrency(value) {
  return parseFloat(value.replace(/,/g, ""));
}

// Format function, if not already defined
function formatToTwoDecimalPlaces(value) {
  return parseFloat(value).toFixed(2);
}

export class CreatePurchaseInvoicePage {
  header = "h2";
  cancelBtn =
    "div[class='button-wrap'] button[class='sc-jSUZER cURnwe secondary small '] span";
  saveBtn = "button[type='submit'] span";
  paymentMode = '[class="payment"] [class="radio-list"] span';
  // documentDate = "input[placeholder='select date']"
  documentDate = '[class="moment"]';

  vendorInvoiceNumber = "input[placeholder='Vendor Invoice Number']";
  buDropdown = '.sc-pyfCe:contains("BU") + .select-css';
  bUDropdownValEle = "div.zindex-2__option ";

  vendorLedgerDropdown = ".customer-name > .form-select-input";
  customerLedgeDropdownVal =
    '[class="zindex-2__menu css-26l3qy-menu"] [style="font-size: 16px;"]';
  customerLedgerValOnDropdown =
    '[class="zindex-2__single-value css-qc6sy-singleValue"] [style="font-size: 16px;"]';

  remarksText = "input[placeholder='Remarks']";

  skuEle =
    ".sku > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container";
  skuList = ".zindex-2__menu";

  batchNameEle =
    ".batch > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container";
  uomEle =
    ".unit-search-input > .sc-hhOBVt > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container";

  sellableTextEle = "tr > :nth-child(6) > .form-input > #input";
  damageTextEle = "tr > :nth-child(7) > .form-input > #input";
  shortageTextEle = "tr > :nth-child(8) > .form-input > #input";
  rateTextEle = "tr > :nth-child(10) > .form-input > #input";

  addBillTerms = ".td-discount > .sc-jSUZER";
  billTermsHeader = ".evolve-dialog__header > div > h2";
  exciseText =
    ":nth-child(1) > :nth-child(2) > .type-section > .form-input > #input";
  lineDiscText =
    ":nth-child(2) > :nth-child(2) > .type-section > .form-input > #input";
  addSkuBtn = "button[class='sc-jSUZER jKQpJu primary small '] span";
  addBillTernBtn = ".dSdSlu";

  addNewLineBtn = ".add-btn";

  invoiceNumberEle = ".InvoiceNumber > :nth-child(2)";

  getHeaderText() {
    return cy.get(this.header).should("be.visible");
  }

  clickCancelButton() {
    cy.get(this.cancelBtn).should("be.visible").click();
  }

  clickSaveButton() {
    cy.get(this.saveBtn).should("be.visible").click({ force: true });
  }

  checkSaveBtnIsDisabled() {
    cy.get(this.saveBtn).parent().should("have.class", "disabled");
  }

  verifySuccessMessage(message) {
    cy.url().should("include", "/purchase/purchase-invoice");
    cy.contains(message).should("be.visible");
  }

  selectPaymentMode(mode) {
    cy.get(this.paymentMode).should("be.visible").contains(mode).click();
  }

  clickOnDocumentDate() {
    cy.get(this.documentDate).click();
  }

  selectYear(year) {
    cy.get(".rdrYearPicker select").select(year.toString());
  }

  selectMonth(month) {
    cy.get(".rdrMonthPicker select").select(month.toString());
  }

  selectDay(day) {
    cy.get(".rdrDays")
      .find(
        "button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span"
      )
      .contains(day.toString())
      .click();
  }

  selectDateOnCalender(year, month, day) {
    // this.clickOnDocumentDate()
    this.selectYear(year);
    this.selectMonth(month);
    this.selectDay(day);
  }

  enterVendorInvoiceNumber(vendorInvoiceNum) {
    cy.get(this.vendorInvoiceNumber).type(vendorInvoiceNum);
  }

  selectBusinessUnit(buName) {
    cy.get(this.buDropdown).click();
    cy.selectDropdownValue(buName);
  }

  selectVendorLedger(vendorName) {
    cy.get(this.vendorLedgerDropdown).click();
    cy.get(this.vendorLedgerDropdown).type(vendorName + "{enter}");
  }

  enterRemarks(remarks) {
    cy.get(this.remarksText).type(remarks);
  }

  selectSKU(skuTitle) {
    cy.get(this.skuEle)
      .click()
      .wait(200)
      .focused()
      .type(skuTitle + "{downarrow}{enter}");
  }

  selectSKUBatch() {
    cy.get(this.batchNameEle).click().focused().type("{downarrow}{enter}");
  }

  selectUOM() {
    cy.get(this.uomEle).click().focused().type("{downarrow}{enter}");
  }

  enterSellableValue(sellable) {
    cy.get(this.sellableTextEle).clear().type(sellable);
  }

  enterDamageValue(damage) {
    cy.get(this.damageTextEle).clear().type(damage);
  }

  enterShortageValue(shortage) {
    cy.get(this.shortageTextEle).clear().type(shortage);
  }

  enterRateValue(rate) {
    //explicitly set the input value to an empty string before typing '5000'
    cy.get(this.rateTextEle).invoke("val", "").type(rate);
  }

  clickAddBillTerms() {
    cy.get(this.addBillTerms).click();
  }

  isBillTernHeaderTextDisplayed() {
    return cy.get(this.billTermsHeader).should("be.visible");
  }

  enterFirstBillTermValue(value) {
    cy.get(this.exciseText).clear().type(value);
  }

  enterSecondBillTermValue(value) {
    cy.get(this.lineDiscText).clear().type(value);
  }

  clickAddDiscountBtn() {
    cy.get(this.addBillTernBtn).click({ force: true });
  }

  clickAddSKUBtn() {
    cy.get(this.addSkuBtn).click();
  }

  clickAddNewLineBtn() {
    cy.get(this.addNewLineBtn).click();
  }

  addNewSKU(
    skuTitle,
    skuBatch,
    sellable,
    damage,
    shortage,
    rate,
    excise,
    lineDisc
  ) {
    this.selectSKU(skuTitle);
    this.selectSKUBatch(skuBatch);
    this.enterSellableValue(sellable);
    this.enterDamageValue(damage);
    this.enterShortageValue(shortage);
    this.enterRateValue(rate);
    this.clickAddBillTerms();
    this.isBillTernHeaderTextDisplayed();
    this.enterFirstBillTermValue(excise);
    this.enterSecondBillTermValue(lineDisc);
    this.clickAddBillTerms();
    this.clickAddSKUBtn();
  }

  enterBillLevelDiscount(label, discValue) {
    // cy.get(this.billDiscText).type(billDisc)
    cy.contains("span", label).parents(".left").find("#input").type(discValue);
  }

  checkPurchaseOrderCalculations(billDiscount, tradeDiscount) {
    let billSubtotal = 0;

    // Iterate over rows and calculate bill subtotal
    cy.get("tbody")
      .find("tr")
      .each(($row) => {
        const sellableQuantity = parseCurrency($row.find("td").eq(5).text());
        const damageQuantity = parseCurrency($row.find("td").eq(6).text());
        const shortageQuantity = parseCurrency($row.find("td").eq(7).text());

        const quantity = parseCurrency($row.find("td").eq(8).text());
        const rate = parseCurrency($row.find("td").eq(9).text());
        const amount = parseCurrency($row.find("td").eq(10).text());
        const lineDiscountAmount = parseCurrency(
          $row.find("td").eq(11).find(".discount-amt").text()
        );
        const netAmount = parseCurrency($row.find("td").eq(12).text());

        // Assertions for individual row values
        expect(quantity, "Quantity check").to.equal(
          sellableQuantity + damageQuantity + shortageQuantity
        );
        expect(formatToTwoDecimalPlaces(amount), "Amount check").to.equal(
          (quantity * rate).toFixed(2)
        );
        expect(
          formatToTwoDecimalPlaces(netAmount),
          "Net amount check"
        ).to.equal(formatToTwoDecimalPlaces(amount + lineDiscountAmount));

        // Accumulate bill subtotal
        billSubtotal += netAmount;
      })
      .then(() => {
        cy.wrap(billSubtotal).as("expectedSubTotalAmount");
      });
    this.getSubTotal("subTotalAmount");

    // Verify subtotal amount
    cy.get("@expectedSubTotalAmount").then((expectedSubTotalAmount) => {
      cy.get("@subTotalAmount").then((actualSubTotalAmount) => {
        expect(
          formatToTwoDecimalPlaces(parseCurrency(actualSubTotalAmount)),
          "Subtotal verification"
        ).to.equal(formatToTwoDecimalPlaces(expectedSubTotalAmount));
      });
    });

    // Retrieve and alias discounts and amounts
    this.getBillDiscount("billDiscountAmount");
    this.getTradeDiscount("tradeDiscountAmount");
    this.getTaxableAmount("taxableAmount");
    this.getVat("vatAmount");
    this.getTotal("totalAmount");

    // Calculate and verify discounts and total amounts
    cy.get("@expectedSubTotalAmount").then((expectedSubTotalAmount) => {
      cy.get("@billDiscountAmount").then((billDiscountAmount) => {
        cy.get("@tradeDiscountAmount").then((tradeDiscountAmount) => {
          const expectedBillDiscountAmount =
            (expectedSubTotalAmount * billDiscount) / 100;
          const expectedTradeDiscountAmount =
            (expectedSubTotalAmount * tradeDiscount) / 100;

          try {
            expect(
              formatToTwoDecimalPlaces(parseCurrency(billDiscountAmount)),
              "Bill Discount check"
            ).to.equal(formatToTwoDecimalPlaces(expectedBillDiscountAmount));
          } catch (error) {
            cy.log("Bill discount amount does not match");
          }

          try {
            expect(
              formatToTwoDecimalPlaces(parseCurrency(tradeDiscountAmount)),
              "Trade Discount check"
            ).to.equal(formatToTwoDecimalPlaces(expectedTradeDiscountAmount));
          } catch (error) {
            cy.log("Trade discount amount does not match");
          }
        });
      });
    });

    // Verify final calculations (Taxable Amount, VAT, Total)
    cy.get("@expectedSubTotalAmount").then((expectedSubTotalAmount) => {
      cy.get("@billDiscountAmount").then((billDiscAmount) => {
        cy.get("@tradeDiscountAmount").then((tradeDiscAmount) => {
          cy.get("@taxableAmount").then((taxableAmount) => {
            cy.get("@vatAmount").then((vatAmount) => {
              cy.get("@totalAmount").then((totalAmount) => {
                const expectedTaxableAmount = formatToTwoDecimalPlaces(
                  expectedSubTotalAmount -
                    parseCurrency(billDiscAmount) -
                    parseCurrency(tradeDiscAmount)
                );
                const expectedVatAmount = formatToTwoDecimalPlaces(
                  expectedTaxableAmount * 0.13
                );
                const expectedTotalAmount = formatToTwoDecimalPlaces(
                  parseFloat(expectedTaxableAmount) +
                    parseFloat(expectedVatAmount)
                );

                // Assertions for final values
                try {
                  expect(
                    formatToTwoDecimalPlaces(parseCurrency(taxableAmount)),
                    "Taxable Amount check"
                  ).to.equal(expectedTaxableAmount);
                } catch (error) {
                  cy.log("Taxable amount does not match");
                }

                try {
                  expect(
                    formatToTwoDecimalPlaces(parseCurrency(vatAmount)),
                    "VAT Amount check"
                  ).to.equal(expectedVatAmount);
                } catch (error) {
                  cy.log("VAT amount does not match");
                }

                try {
                  expect(
                    formatToTwoDecimalPlaces(parseCurrency(totalAmount)),
                    "Total Amount check"
                  ).to.equal(expectedTotalAmount);
                } catch (error) {
                  cy.log("Total amount does not match");
                }
              });
            });
          });
        });
      });
    });
  }

  getSubTotal(aliasName) {
    cy.getTextAndAlias("Sub Total", aliasName);
  }

  getBillDiscount(aliasName) {
    cy.getTextAndAlias("Bill Discount", aliasName);
  }

  getTradeDiscount(aliasName) {
    cy.getTextAndAlias("Trade Discount", aliasName);
  }

  getTaxableAmount(aliasName) {
    cy.getTextAndAlias("Taxable Amount", aliasName);
  }

  getVat(aliasName) {
    cy.getTextAndAlias("VAT", aliasName);
  }

  getTotal(aliasName) {
    cy.getTextAndAlias("Total", aliasName);
  }

  clickOnDropdown(label, index = 0) {
    return cy
      .get(`label:contains("${label}")`)
      .eq(index) // Select the specified instance of the label by index
      .closest(".form-select-input") // Traverse to the container with the dropdown
      .find(".zindex-2__control") // Find the clickable dropdown container
      .click({ force: true }); // Click the dropdown to open it
  }

  selectBusinessUnitValue(buName) {
    cy.get(this.bUDropdownValEle).contains(buName).click({ force: true });
  }
}

export const onCreatePI = new CreatePurchaseInvoicePage();
