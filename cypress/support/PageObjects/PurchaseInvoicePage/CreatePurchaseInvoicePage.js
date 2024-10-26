function formatToTwoDecimalPlaces(value) {
    return parseFloat(value).toFixed(2); // Converts to number and formats to 2 decimal places
};



export class CreatePurchaseInvoicePage {
    
    header = "h2"
    cancelBtn = "div[class='button-wrap'] button[class='sc-jSUZER cURnwe secondary small '] span"
    saveBtn = "button[type='submit'] span"
    paymentMode = '[class="payment"] [class="radio-list"] span'
    // documentDate = "input[placeholder='select date']"


    documentDate = '[class="moment"]'

    vendorInvoiceNumber = "input[placeholder='Vendor Invoice Number']"
    buDropdown = '.sc-pyfCe:contains("BU") + .select-css'

    bUDropdownValEle = "div.zindex-2__option "

    vendorLedgerDropdown = '.customer-name > .form-select-input'

    customerLedgeDropdownVal = '[class="zindex-2__menu css-26l3qy-menu"] [style="font-size: 16px;"]'
    customerLedgerValOnDropdown = '[class="zindex-2__single-value css-qc6sy-singleValue"] [style="font-size: 16px;"]'

    remarksText = "input[placeholder='Remarks']"

    skuEle = '.sku > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'
    skuList = ".zindex-2__menu"

    batchNameEle = '.batch > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'
    uomEle = '.unit-search-input > .sc-hhOBVt > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'

    sellableTextEle = 'tr > :nth-child(6) > .form-input > #input'
    damageTextEle = 'tr > :nth-child(7) > .form-input > #input'
    shortageTextEle = 'tr > :nth-child(8) > .form-input > #input'
    rateTextEle = 'tr > :nth-child(10) > .form-input > #input'

    addBillTerms = '.td-discount > .sc-jSUZER'
    billtermsHeader = '.evolve-dialog__header > div > h2'
    exciseText = ':nth-child(1) > :nth-child(2) > .type-section > .form-input > #input'
    lineDiscText = ':nth-child(2) > :nth-child(2) > .type-section > .form-input > #input'
    addSkuBtn = "button[class='sc-jSUZER jKQpJu primary small '] span"
    addBillTernBtn = '.dSdSlu'
    

    addNewLineBtn = '.add-btn'

    billDiscText = ':nth-child(2) > .left > :nth-child(3) > .form-input > .sc-idXgbr'
    tradeDiscText = ':nth-child(3) > .left > :nth-child(3) > .form-input > .sc-idXgbr'

 
    billSubTotalEle = ':nth-child(1) > .calculated-value'
    billDiscountEle = ':nth-child(2) > .left > :nth-child(3) > .form-input > #input'
    billDiscountAmount = ':nth-child(2) > .calculated-value'
    tradeDiscountEle = ':nth-child(3) > .left > :nth-child(3) > .form-input > #input'
    tradeDiscountAmount = ':nth-child(3) > .calculated-value'
    taxableAmountEle = ':nth-child(5) > .calculated-value'
    vatAmountEle = ':nth-child(6) > .calculated-value'
    totalEle = ':nth-child(7) > .calculated-value'
    



    invoiceNumberEle = '.InvoiceNumber > :nth-child(2)'




    getHeaderText() {
        return cy.get(this.header).should("be.visible")
    }

    clickCancelButton () {
        cy.get(this.cancelBtn).should('be.visible').click()
    }

    clickSaveButton () {
        cy.get(this.saveBtn).should('be.visible').click({force:true})
    }

    checkSaveBtnIsDisabled() {
        cy.get(this.saveBtn)
            .parent()
            .should('have.class','disabled')
    }
    
    verifySuccessMessage(message) {
        cy.url().should('include', '/purchase/purchase-invoice')
        cy.contains(message).should('be.visible')
    }


    selectPaymentMode(mode) {
        cy.get(this.paymentMode).should('be.visible').contains(mode).click()
    }


    clickOnDocumentDate() {
        cy.get(this.documentDate).click()
    }

    selectYear(year) {
        cy.get('.rdrYearPicker select').select(year.toString())
    }

    selectMonth(month) {
        cy.get('.rdrMonthPicker select').select(month.toString())
    }

    selectDay(day) {
        cy.get('.rdrDays')
        .find('button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span')
        .contains(day.toString())
        .click()
    }

    selectDateOnCalender(year, month, day) {
        // this.clickOnDocumentDate()
        this.selectYear(year)
        this.selectMonth(month)
        this.selectDay(day)
    }



    enterVendorInvoiceNumber(vendorInvoiceNum) {
        cy.get(this.vendorInvoiceNumber).type(vendorInvoiceNum)
    }
    
    selectBusinessUnit(buName) {
        cy.get(this.buDropdown).click()
        cy.selectDropdownValue(buName)
    }

    selectVendorLedger(vendorName) {
        cy.get(this.vendorLedgerDropdown).click()
        cy.get(this.vendorLedgerDropdown).type(vendorName + "{enter}")
    }


    enterRemarks (remarks) {
        cy.get(this.remarksText).type(remarks)
    }

    selectSKU(skuTitle) {
        cy.get(this.skuEle)
        .click()
        .wait(200)
        .focused()
        .type(skuTitle + "{downarrow}{enter}")
    }

    selectSKUBatch() {
        cy.get(this.batchNameEle)
        .click()
        .focused()
        .type("{downarrow}{enter}")
    }

    selectUOM() {
        cy.get(this.uomEle)
        .click()
        .focused()
        .type("{downarrow}{enter}")
    }

    enterSellableValue(sellable) {
        cy.get(this.sellableTextEle).clear().type(sellable)
    }

    enterDamageeValue(damage) {
        cy.get(this.damageTextEle).clear().type(damage)
    }

    enterShortageValue(shortage) {
        cy.get(this.shortageTextEle).clear().type(shortage)
    }

    enterRateValue(rate) {
        //explicitly set the input value to an empty string before typing '5000'
        cy.get(this.rateTextEle).invoke('val','').type(rate)
    }

    clickAddBillTerms() {
        cy.get(this.addBillTerms).click()
    }

    isBillTernHeaderTextDisplayed() {
        return cy.get(this.billtermsHeader).should('be.visible')
    }

    enterFirstBillTemrValue(value) {
        cy.get(this.exciseText).clear().type(value)
    }

    enterSecondBillTemrValue(value) {
        cy.get(this.lineDiscText).clear().type(value)
    }

    clickAddDiscountBtn() {
        cy.get(this.addBillTernBtn).click({force:true})
    }

    clickAddSKUBtn() {
        cy.get(this.addSkuBtn).click()
    }


    clickAddNewLineBtn() {
        cy.get(this.addNewLineBtn).click()
    }

    addNewSKU(skuTitle, skuBatch, sellable, damage, shortage, rate, excise, lineDisc,
        ){
        this.selectSKU(skuTitle)
        this.selectSKUBatch(skuBatch)
        this.enterSellableValue(sellable)
        this.enterDamageeValue(damage)
        this.enterShortageValue(shortage)
        this.enterRateValue(rate)
        this.clickAddBillTerms()
        this.isBillTernHeaderTextDisplayed()
        this.enterFirstBillTemrValue(excise)
        this.enterSecondBillTemrValue(lineDisc)
        this.clickAddBillTermsBtn()
        this.clickAddSKUBtn()

    }

    enterBillLevelDiscount(label,discValue) {
        // cy.get(this.billDiscText).type(billDisc)
        cy.contains('span',label)
            .parents('.left')
            .find('#input')
            .type(discValue)
    }


    checkPurchaseOrderCalculations(billDiscount, tradeDiscount) {

        let billSubtotal = 0
        cy.get('tbody').find('tr').each(($row) => {
            
            const sellableQuantity = parseFloat($row.find('td').eq(5).text().replace(/,/g, ''))
            const damageQuantity = parseFloat($row.find('td').eq(6).text().replace(/,/g, ''))
            const shortageQuantity = parseFloat($row.find('td').eq(7).text().replace(/,/g, ''))
            
            const quantity = parseFloat($row.find('td').eq(8).text().replace(/,/g, ''))
            const rate = parseFloat($row.find('td').eq(9).text().replace(/,/g, ''))
            const amount = parseFloat($row.find('td').eq(10).text().replace(/,/g, ''))
            const lineDiscountAmount = parseFloat($row.find('td').eq(11).find('.discount-amt').text().replace(/,/g, ''))
            const netAmount = parseFloat($row.find('td').eq(12).text().replace(/,/g, ''))
            
            expect(quantity, "Comparing  quantity with Expected quanitty").to.equal(sellableQuantity+damageQuantity+shortageQuantity)
            expect(formatToTwoDecimalPlaces(amount), "Comparing  Amount with Expected Amount").to.equal((quantity * rate).toFixed(2).toString())
            expect(formatToTwoDecimalPlaces(netAmount), "Comparing SubTotal Amount with Expected subtotal Amount").to.equal(formatToTwoDecimalPlaces(amount + lineDiscountAmount).toString())
            billSubtotal += parseFloat(netAmount)
        }).then(() => {
            cy.wrap(billSubtotal).as('expectedSubTotalAmount')
        })

        cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
            cy.get(this.billSubTotalEle).invoke('text').then(actualSubTotalAmount => {
                try {
                    expect(formatToTwoDecimalPlaces(parseFloat(actualSubTotalAmount.replace(/,/g, ''))), 'Checking line level subtotal with Bill level sub total').to.equal(formatToTwoDecimalPlaces(expectedSubTotalAmount))
                } catch (error) {
                    cy.log('Sub Total are not matching')
                }
            })
        })



        cy.getTextAndAlias(this.billDiscountAmount, 'billDiscountAmount')
        cy.getTextAndAlias(this.tradeDiscountAmount, 'tradeDiscountAmount')
        cy.getTextAndAlias(this.taxableAmountEle, 'taxableAmount')
        cy.getTextAndAlias(this.vatAmountEle, 'vatAmount')
        cy.getTextAndAlias(this.totalEle, 'totalAmount')

        cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
            cy.get('@billDiscountAmount').then((billDiscountAmount) => {
                cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
                    
                   let  expectedBillDiscountAmount = (expectedSubTotalAmount * billDiscount)/100
                    let expectedTradeDiscountAmount = (expectedSubTotalAmount - expectedBillDiscountAmount) * tradeDiscount/100
                    
                    // cy.log("expectedBillDiscountAmount:  "+expectedBillDiscountAmount)
                    // cy.log("expectedTradeDiscountAmount:  "+expectedTradeDiscountAmount)

                    try {
                        expect(parseFloat(billDiscountAmount.replace(/,/g, '')).toString(), 'Checking bill Discount amount calculation').to.equal(formatToTwoDecimalPlaces(expectedBillDiscountAmount))
                    } catch (error) {
                        cy.log('Bill Discount AMount does not matched')
                    }

                    try {
                        expect(parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString(), 'Checking trade Discount amount calculation').to.equal(formatToTwoDecimalPlaces(expectedTradeDiscountAmount))
                    } catch (error) {
                        cy.log('Trade Discount amount does not matched')
                    }
                })
            })
        })



        cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
            cy.get('@billDiscountAmount').then((billDiscAmount) => {
                cy.get('@tradeDiscountAmount').then((tradeDiscAmount) => {
                    cy.get('@taxableAmount').then((taxableAmount) => {
                        cy.get('@vatAmount').then((vatAmount) => {
                            cy.get('@totalAmount').then((totalAmount) => {
                                const expectedTaxableAmount = formatToTwoDecimalPlaces(expectedSubTotalAmount - billDiscAmount - tradeDiscAmount)
                                const expectedVatAmount = formatToTwoDecimalPlaces(expectedTaxableAmount * 0.13)
                                const expectedTotalAmount = (parseFloat((expectedSubTotalAmount - billDiscAmount - tradeDiscAmount)) + parseFloat((expectedTaxableAmount * 0.13))).toFixed(2)
                                const actualTaxableAmount = taxableAmount.replace(/,/g, '')
                                const actualVatAmount = vatAmount.replace(/,/g, '')
                                const actualTotalAmount = totalAmount.replace(/,/g, '')
                                
                                try {
                                    expect(parseFloat(actualTaxableAmount), "Comparing Taxable Amount").to.equal(parseFloat(expectedTaxableAmount))    
                                } catch (error) {
                                    cy.log('Taxable Amount does not matched with the expected value')
                                    
                                }

                                try {
                                    expect(formatToTwoDecimalPlaces(actualVatAmount), "Comparing VAT Amount").to.equal(expectedVatAmount)
                                } catch (error) {
                                    cy.log('Vat Amount does not matched with the expected value')                                    
                                }

                                try {
                                    expect(parseFloat(actualTotalAmount), "Comparing Total Amount").to.equal(parseFloat(Math.round(expectedTotalAmount)))
                                } catch (error) {
                                    cy.log('Total Amount does not matched with the expected value')   
                                }                                
                            })
                        })
                    })
                })
            })
        })

    }
 



    getSubTotal(aliasName) {
        cy.get(this.billSubTotalEle).invoke('text').then((subTotal) => {
            cy.log(subTotal)
            cy.wrap(subTotal).as(aliasName)
        })
    }

    getBillDiscount(aliasName) {
        cy.get(this.billDiscountAmount).invoke('text').then((billDiscount) => {
            cy.log(billDiscount)
            cy.wrap(billDiscount).as(aliasName)
        })
    }

    getTradeDiscount(aliasName) {
        cy.get(this.tradeDiscountAmount).invoke('text').then((tradeDiscount) => {
            cy.log(tradeDiscount)
            cy.wrap(tradeDiscount).as(aliasName)
        })
    }

    getTaxableAmount(aliasName) {
        cy.get(this.taxableAmountEle).invoke('text').then((taxableAmount) => {
            cy.log(taxableAmount)
            cy.wrap(taxableAmount).as(aliasName)
        })
    }

    getVat(aliasName) {
        cy.get(this.vatAmountEle).invoke('text').then((vatAmount) => {
            cy.log(vatAmount)
            cy.wrap(vatAmount).as(aliasName)
        })
    }

    getTotal(aliasName) {
        cy.get(this.totalEle).invoke('text').then((total) => {
            cy.log(total)
            cy.wrap(total).as(aliasName)
        })
    }




    //sdfadfafa


    clickOnDropdown(labelText) {
        cy.contains('label', labelText)
            // Find the parent div with class "sc-hhOBVt" and then find the child div with class "zindex-2__input-container"
            .parents('div.sc-hhOBVt')
            .find('.zindex-2__input-container')
            // Click on the div with class "zindex-2__input-container"
            .click()
    }



    selectBusinessUnitValue(buName) {
        cy.get(this.bUDropdownValEle).contains(buName).click({ force: true })
    }


}

export const onCreatePI = new CreatePurchaseInvoicePage()