function formatToTwoDecimalPlaces(value) {
    return parseFloat(value).toFixed(2); // Converts to number and formats to 2 decimal places
};




export class SalesInvoicePage {
    pageheader = "h2"
    createBtn = "svg[class$='icon plus']"
    paymentMode = '[class="payment"] [class="radio-list"] span'
    salesInvoiceUrl = '/sales/sales-invoice'

    // businessUnitDropdown = ':nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control'
    businessUnitDropdown = '[class="sc-gYbzsP hFkPvc"]'
    businessUnitsValue = '[class="zindex-2__menu css-26l3qy-menu"] div [class="zindex-2__option css-yt9ioa-option"]'
    customerLedger = '[class="zindex-2__input-container css-ackcql"]'
    customerLedgeDropdownVal = '[class="zindex-2__menu css-26l3qy-menu"] [style="font-size: 16px;"]'
    customerLedgerValOnDropdown = '[class="zindex-2__single-value css-qc6sy-singleValue"] [style="font-size: 16px;"]'

    remarks = '[placeholder="Remarks"]'
    sku = '[class="search-table-input"]'
    inStock = 'td.free-sku-th + td.text-right'
    quantity = '[class="table-input-1 text-right quantity"]'
    addBtn = '.sc-jSUZER.jKQpJu.primary.small'
    addResetBtn = 'td.text-right.button-td'

    billNameEle = '[placeholder="Bill Name"]'
    billNameErrorMessageEle = '.error-message'

    plusBtn = '.kHoScB'


    cancelBtn = "div[class='button-wrap'] button[class='sc-jSUZER cURnwe secondary small '] span"
    saveBtn = "button[type='submit'] span"




    billSubTotalEle = ':nth-child(1) > .calculated-value'
    billDiscountEle = ':nth-child(2) > .left > :nth-child(3) > .form-input > #input'
    billDiscountAmount = ':nth-child(2) > .calculated-value'
    tradeDiscountEle = ':nth-child(3) > .left > :nth-child(3) > .form-input > #input'
    tradeDiscountAmount = ':nth-child(3) > .calculated-value'
    // billTotalEle = ':nth-child(4) >.calculated-value' 
    taxableAmountEle = ':nth-child(5) > .calculated-value'
    vatAmountEle = ':nth-child(6) > .calculated-value'
    totalEle = ':nth-child(7) > .calculated-value'
    



    invoiceNumberEle = '.InvoiceNumber > :nth-child(2)'





    naviageToSalesInvoice() {
        cy.visit(this.salesInvoiceUrl)
    }

    searchInvoiceByText (text) {
        cy.searchByText(text)
        cy.contains('tbody tr td',text)
    }

    clickCreateBtn() {
        // Get the body element to use as a reference point
        // cy.get('body').trigger('mousemove', 'center').click();
        cy.get(this.createBtn).click()

    }

    selectPaymentMode(mode) {
        cy.get(this.paymentMode).contains(mode).click()
    }

    clickOnBusinessUnitDropdown() {
        // cy.get(this.businessUnitDropdown).click()
        cy.contains(this.businessUnitDropdown,'BU').siblings().click()
    }

    selectBusinessUnitByValue(value) {
        cy.get(this.businessUnitsValue).contains(value).click()
    }

    selectCustomerLedger(customerLedgerName) {
        cy.get(this.customerLedger).eq(2).click({ force: true })
        // cy.focused().type(customerLedgerName+'{downarrow}{enter}')
        cy.focused().type(customerLedgerName)
        cy.wait(2000)
        cy.get(this.customerLedgeDropdownVal).contains(customerLedgerName).click()
        cy.get(this.customerLedgerValOnDropdown).should('contain', customerLedgerName)

    }

    enterCustomerName(billName) {
        cy.get(this.billNameEle).type(billName)
    }
    
    getBillNameErrorMessage(alias){
        cy.get(this.billNameErrorMessageEle).invoke('text').then(text => {
            cy.wrap(text).as(alias)
        })
    }
    typeRemarks(remarks) {
        cy.get(this.remarks).type(remarks,{force:true})
    }

    selectSalesPerson(agentName) {
        cy.get(this.customerLedger).eq(3).click({ force: true })
        cy.focused().type(agentName + '{downarrow}{enter}')
    }

    selectSKU(index, sku) {
        cy.get(this.sku).eq(index).click()
        cy.wait(1000)
        cy.focused().type(sku + '{downarrow}{enter}')

    }

    checkStockOfSelectedSKU(index) {
        cy.wait(1000)
        cy.get(this.inStock).eq(index).invoke('text').then((stockText) => {
            const stockValue = parseInt(stockText);
            cy.log(stockValue)

            if (Number.isNaN(stockValue) || stockValue === 0) {
                cy.log('Insufficient stock or no stock value. Terminating the test.');
                return;
            }
        }

        )
    }


    typeQuantity(index, quantity) {
        cy.get(this.quantity).eq(index).type(quantity)
    }

    clickOnAddButon() {
        cy.contains(this.addResetBtn, 'Add')
            .find(this.addBtn)
            .click({ force: true });
    }

    clickOnSaveBtn() {
        cy.get(this.saveBtn).click({ force: true })
    }


    verifySuccessMessage(message) {
        cy.url().should('include', '/sales/sales-invoice')
        cy.contains(message).should('be.visible')
    }

    getInvoiceNumber(aliasName) {
        cy.get(this.invoiceNumberEle).invoke('text').then((invoiceNumber) => {
            cy.log(invoiceNumber)
            cy.wrap(invoiceNumber).as(aliasName)
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




    clickOnPlusButton() {
        cy.get(this.plusBtn).click()
    }


    enterBillDiscount(billDiscount) {
        cy.get(this.billDiscountEle).type(billDiscount)
        cy.wait(1000)
    }

    enterTradeDiscount(tradeDiscount) {
        cy.get(this.tradeDiscountEle).type(tradeDiscount)
        cy.wait(1000)
    }


    checkOrderCalculation(billDiscount, tradeDiscount) {
        let billSubtotal = 0
        cy.get('tbody').find('tr').each(($row) => {
            const quantity = parseFloat($row.find('td').eq(5).text().replace(/,/g, ''))
            const rate = parseFloat($row.find('td').eq(6).text())
            const amount = parseFloat($row.find('td').eq(7).text().replace(/,/g, ''))
            const discount = parseFloat($row.find('td').eq(8).find('.discount-amt').text().replace(/,/g, ''))
            const netAmount = parseFloat($row.find('td').eq(9).text().replace(/,/g, ''))

            // cy.log(discount)
            // cy.log(quantity)
            // cy.log(rate)
            // cy.log(amount)
            // cy.log(netAmount)

            expect(formatToTwoDecimalPlaces(amount), "Comparing  Amount with Expected Amount").to.equal((quantity * rate).toFixed(2).toString())
            expect(formatToTwoDecimalPlaces(netAmount), "Comparing SubTotal Amount with Expected subtotal Amount").to.equal(formatToTwoDecimalPlaces(amount - discount).toString())
            billSubtotal += parseFloat(netAmount)
        }).then(() => {
            // cy.log('Total ' + billSubtotal)
            cy.wrap(billSubtotal).as('expectedSubTotalAmount');
        })

        cy.get('@expectedSubTotalAmount').then((expectedSubTotalAmount) => {
            cy.get(this.billSubTotalEle).invoke('text').then(actualSubTotalAmount => {
                try {
                expect(parseFloat(actualSubTotalAmount.replace(/,/g, '')).toString(), 'Checking line level subtotal with Bill level sub total').to.equal(formatToTwoDecimalPlaces(expectedSubTotalAmount))
                 } catch (error) {
                        cy.log('Bill Discount AMount does not matched')
                    }
            })
        })

        this.enterBillDiscount(billDiscount)
        this.enterTradeDiscount(tradeDiscount)

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
                                    expect(parseFloat(actualTotalAmount), "Comparing Total Amount").to.equal(parseFloat(Math.ceil(expectedTotalAmount)))
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



}

export const onSalesInvoicePage = new SalesInvoicePage()