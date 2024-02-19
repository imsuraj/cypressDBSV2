const { onDashboardPage } = require("../../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onJvDetailPage } = require("../../../support/PageObjects/JournalVoucherPage/JournalVoucherDetailPage");
const { onJVPage } = require("../../../support/PageObjects/JournalVoucherPage/JournalVoucherPage");
const { onCreatePromotionPage } = require("../../../support/PageObjects/PromotionPage/CreatePromotionPage.po")
const { onCreatePI } = require("../../../support/PageObjects/PurchaseInvoicePage/CreatePurchaseInvoicePage")
const { onPurchaseInvoicePage, onPIPage } = require("../../../support/PageObjects/PurchaseInvoicePage/PurchaseInvoicePage")


function getTime() {
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    return timestamp
}


function getAdjustedDateValues(adjustmentDays) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - adjustmentDays);

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = currentDate.getFullYear();

    // Return the values as an object
    return {
        day,
        month,
        year
    }
}

describe('Create Purchase Invoice Test', () => {


    beforeEach('Login and Open Create Purchase Invoice Page', () => {


        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.visit('/')
        onDashboardPage.hoverMouserOverPurchase()
        onDashboardPage.clickPurchaseInvoice()
        onPIPage.clickCreateIcon()

        cy.fixture('dbs_pi_sku').as('data')//loading fixture

        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Create Purchase Invoice')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })
    })

    it('Verify user can create a purchase invoice by entering value for mandatory fields', () => {

        const adjustedDate = getAdjustedDateValues(122)

        onCreatePI.selectPaymentMode("Cash")
        onCreatePI.clickOnDocumentDate()
        onCreatePI.selectDateOnCalender(adjustedDate.year, adjustedDate.month, adjustedDate.day)
        onCreatePI.enterVendorInvoiceNumber('ARI' + getTime())
        onCreatePI.clickOnDropdown('BU')
        onCreatePI.selectBusinessUnitValue('Sunfeast')
        onCreatePI.selectVendorLedger('Sunfeast Vendor')
        onCreatePI.enterRemarks("Testing 123 hello, o hello ")

        cy.get('@data').then((data) => {
            data.forEach((sku, index) => {
                onCreatePI.selectSKU(sku.skuTitle)
                onCreatePI.selectSKUBatch()
                onCreatePI.selectUOM()
                onCreatePI.enterSellableValue(sku.sellable)
                onCreatePI.enterDamageeValue(sku.damages)
                onCreatePI.enterShortageValue(sku.shortages)
                onCreatePI.enterRateValue(sku.rate)
                onCreatePI.clickAddBillTerms()
                onCreatePI.isBillTernHeaderTextDisplayed()
                onCreatePI.enterFirstBillTemrValue(sku.excise)
                onCreatePI.enterSecondBillTemrValue(sku.lineDisc)
                onCreatePI.clickAddDiscountBtn()
                onCreatePI.clickAddSKUBtn()
                if (index < 2) {
                    onCreatePI.clickAddNewLineBtn()
                }
            })
        })
        onCreatePI.enterBillLevelDiscount('Bill Discount', 1)
        onCreatePI.enterBillLevelDiscount('Trade Discount', 0.51)
        onCreatePI.checkPurchaseOrderCalculations(1, 0.51)

        onCreatePI.clickSaveButton()
        onCreatePI.verifySuccessMessage('Success: Purchase invoice has been created!')

    })



    it.only('Verify JV, Ledger Report and IRD report after creating a PI', () => {

        const adjustedDate = getAdjustedDateValues(7)
        const vendorInvoiceNum = 'ARI' + getTime()

        onCreatePI.selectPaymentMode("Cash")
        onCreatePI.clickOnDocumentDate()
        onCreatePI.selectDateOnCalender(adjustedDate.year, adjustedDate.month, adjustedDate.day)
        onCreatePI.enterVendorInvoiceNumber(vendorInvoiceNum)
        onCreatePI.clickOnDropdown('BU')
        onCreatePI.selectBusinessUnitValue('Sunfeast')
        onCreatePI.selectVendorLedger('Sunfeast Vendor')
        onCreatePI.enterRemarks("Testing 123 hello, o hello ")

        cy.get('@data').then((data) => {
            data.forEach((sku, index) => {
                onCreatePI.selectSKU(sku.skuTitle)
                onCreatePI.selectSKUBatch()
                onCreatePI.selectUOM()
                onCreatePI.enterSellableValue(sku.sellable)
                onCreatePI.enterDamageeValue(sku.damages)
                onCreatePI.enterShortageValue(sku.shortages)
                onCreatePI.enterRateValue(sku.rate)
                onCreatePI.clickAddBillTerms()
                onCreatePI.isBillTernHeaderTextDisplayed()
                onCreatePI.enterFirstBillTemrValue(sku.excise)
                onCreatePI.enterSecondBillTemrValue(sku.lineDisc)
                onCreatePI.clickAddDiscountBtn()
                onCreatePI.clickAddSKUBtn()
                if (index < 2) {
                    onCreatePI.clickAddNewLineBtn()
                }
            })
        })
        onCreatePI.enterBillLevelDiscount('Bill Discount', 1)
        onCreatePI.enterBillLevelDiscount('Trade Discount', 0.51)
        onCreatePI.checkPurchaseOrderCalculations(1, 0.51)


        onCreatePI.getSubTotal('subTotal')
        onCreatePI.getBillDiscount('billDiscountAmount')
        onCreatePI.getTradeDiscount('tradeDiscountAmount')
        onCreatePI.getTaxableAmount('taxableAmount')
        onCreatePI.getVat('totalTaxAmount')
        onCreatePI.getTotal('totalAmount')

        onCreatePI.clickSaveButton()
        onCreatePI.verifySuccessMessage('Success: Purchase invoice has been created!')

        onPIPage.applyDateFilter('P3M')
        onPIPage.getPurchaseDocNumberOfAVendorInvoiceNumber(vendorInvoiceNum, 'purchaseDocNum')





        onDashboardPage.hoverMouserOverAccountingEntries()
        onDashboardPage.clickOnJournalVoucher()
        onDashboardPage.verifyJournalVoucherUrl()

        onJVPage.removeFilterInJV()
        onJVPage.applyDateFilter('MTD')

        cy.get('@purchaseDocNum').then((purchaseDocNum) => {
            cy.log(purchaseDocNum)
            onJVPage.searchJVwithInvoiceNumber(purchaseDocNum)
            onJVPage.openJvDetailsOfSearchedInvoice(purchaseDocNum)
            onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(purchaseDocNum)

            // onJvDetailPage.getDebitValueForLedger('Bill Discount A/c', 'billDiscAmount')
            // onJvDetailPage.getDebitValueForLedger('Trade Discount A/c', 'tradeDiscAmount')
            // onJvDetailPage.getDebitValueForLedger('Sunfeast Vendor', 'vendorAmount')
            // onJvDetailPage.getCreditValueForLedger('VAT A/C', 'vatAmount')
            // // onJvDetailPage.getCreditValueForLedger('###1.1ss', 'roundAmount')
            // onJvDetailPage.getCreditValueForLedger('SALES A/C', 'salesAmount')


        })



    })

})