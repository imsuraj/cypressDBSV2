class CreatePurchaseInvoice {
    
    header = "h2"
    cancelBtn = "div[class='button-wrap'] button[class='sc-jSUZER cURnwe secondary small '] span"
    saveBtn = "button[type='submit'] span"
    paymentMode= "..payment > div"
    documentDate = "input[placeholder='select date']"
    vendorInvoiceNumber = "input[placeholder='Vendor Invoice Number']"
    buDropdown = '.sc-pyfCe:contains("BU") + .select-css'
    vendorLedgerDropdown = '.customer-name > .form-select-input'
    remarksText = "input[placeholder='Remarks']"

    skuTitleText = '.sku > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'
    skuList = ".zindex-2__menu"
    skuVal = "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div"
    batchNameText = '.batch > .form-select-input > :nth-child(1) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'
    sellableText = 'tr > :nth-child(6) > .form-input > .sc-idXgbr'
    damageText = 'tr > :nth-child(7) > .form-input > .sc-idXgbr'
    shortageText = 'tr > :nth-child(8) > .form-input > .sc-idXgbr'
    rateText = 'tr > :nth-child(10) > .form-input > .sc-idXgbr'

    addBillTerms = '.td-discount > .sc-jSUZER'
    billtermsHeader = '.evolve-dialog__header > div > h2'
    exciseText = ':nth-child(1) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr'
    lineDiscText = ':nth-child(2) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr'
    addSkuBtn = "button[class='sc-jSUZER jKQpJu primary small '] span"
    addBillTernBtn = '.dSdSlu'
    

    addNewLineBtn = '.add-btn'

    billDiscText = ':nth-child(2) > .left > :nth-child(3) > .form-input > .sc-idXgbr'
    tradeDiscText = ':nth-child(3) > .left > :nth-child(3) > .form-input > .sc-idXgbr'

    subTotal = ':nth-child(1) > .calculated-value > span'
    billDiscount = ':nth-child(2) > .calculated-value'
    tradeDiscount = ':nth-child(3) > .calculated-value'
    taxableAmount = ':nth-child(4) > .calculated-value > span'
    vatAmount = '.mb-24 > .calculated-value > span'
    totalAmount = ':nth-child(6) > .calculated-value > span'




    getHeaderText() {
        return cy.get(this.header).should("be.visible")
    }

    clickCancelButton () {
        cy.get(this.cancelBtn).should('be.visible').click()
    }

    clickSaveButton () {
        cy.get(this.saveBtn).should('be.visible').click({force:true})
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
        cy.get(this.skuTitleText)
        .click()
        .type(skuTitle + "{enter}")
    }

    selectSKUBatch(skuBatchTitle) {
        cy.get(this.batchNameText)
        .click()
        .type(skuBatchTitle + "{enter}")
    }

    enterSellableValue(sellable) {
        cy.get(this.sellableText).clear().type(sellable)
    }

    enterDamageeValue(damage) {
        cy.get(this.damageText).clear().type(damage)
    }

    enterShortageValue(shortage) {
        cy.get(this.shortageText).clear().type(shortage)
    }

    enterRateValue(rate) {
        cy.get(this.rateText).clear().type(rate)
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

    clickAddBillTermsBtn() {
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

    enterBillDiscount(billDisc) {
        cy.get(this.billDiscText).type(billDisc)
    }

    enterTradeDiscount(tradeDisc) {
        cy.get(this.tradeDiscText).type(tradeDisc)
    }




}

export default CreatePurchaseInvoice;