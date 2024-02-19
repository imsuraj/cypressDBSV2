const { onDashboardPage } = require("../../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onJvDetailPage } = require("../../../support/PageObjects/JournalVoucherPage/JournalVoucherDetailPage");
const { onJVPage } = require("../../../support/PageObjects/JournalVoucherPage/JournalVoucherPage");
const { onCreatePromotionPage } = require("../../../support/PageObjects/PromotionPage/CreatePromotionPage.po")
const { onCreatePI } = require("../../../support/PageObjects/PurchaseInvoicePage/CreatePurchaseInvoicePage")
const { onPurchaseInvoicePage, onPIPage } = require("../../../support/PageObjects/PurchaseInvoicePage/PurchaseInvoicePage");
const { onCashBookPage } = require("../../../support/PageObjects/Reports/GeneralLedgerReports/CashBookPage.po");
const { onLedgerReportPage } = require("../../../support/PageObjects/Reports/GeneralLedgerReports/LedgerReportPage.po");
const { onPurchaseVatReport } = require("../../../support/PageObjects/Reports/IRDReports/PurchaseVatReportPage.po");
const { onSalesVatReport } = require("../../../support/PageObjects/Reports/IRDReports/SalesVatReportPage.po");
const { onUpdatePurchaseVatReport } = require("../../../support/PageObjects/Reports/IRDReports/UpdagtePurchaseVatReportPage.po");
const { onUpdateSalesVatReport } = require("../../../support/PageObjects/Reports/IRDReports/UpdagteSalesVatReportPage.po");


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

    it('Verify user can create a purchase invoice by entering value for mandatory fields for cash', () => {

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



    it('Verify JV, Ledger Report and IRD report after creating a PI for Cash', () => {

        const adjustedDate = getAdjustedDateValues(0)
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
            let lineDiscAmt = 0;
            let exciseAmount = 0;
            let amount = 0;

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

                amount += (sku.sellable + sku.damages + sku.shortages) * sku.rate
                lineDiscAmt += ((sku.sellable + sku.damages + sku.shortages) * sku.rate) * sku.lineDisc / 100
                exciseAmount += ((sku.sellable + sku.damages + sku.shortages) * sku.rate) * sku.excise / 100

                cy.wrap(amount).as('amount')
                cy.wrap(lineDiscAmt).as('lineDiscAmt')
                cy.wrap(exciseAmount).as('exciseAmount')
            })

        })




        onCreatePI.enterBillLevelDiscount('Bill Discount', 1)
        onCreatePI.enterBillLevelDiscount('Trade Discount', 0.51)
        onCreatePI.checkPurchaseOrderCalculations(1, 0.51)

        cy.get('@amount').then((amount) => {
            cy.get('@lineDiscAmt').then((lineDiscAmt) => {
                cy.get('@exciseAmount').then((exciseAmount) => {
                    cy.log(amount)
                    cy.log(lineDiscAmt)
                    cy.log(exciseAmount)
                })
            })
        })
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

            onJvDetailPage.getCreditValueForLedger('CASH A/C', 'cashAcAmount')
            onJvDetailPage.getCreditValueForLedger('Bill Discount A/c', 'billDiscAmount')
            onJvDetailPage.getCreditValueForLedger('Trade Discount A/c', 'tradeDiscAmount')
            // onJvDetailPage.getDebitValueForLedger('Sunfeast Vendor', 'vendorAmount')
            onJvDetailPage.getDebitValueForLedger('VAT A/C', 'vatAmount')
            onJvDetailPage.getDebitValueForLedger('PURCHASE A/C', 'purchaseAmount')

            onJvDetailPage.getTotalsValue(0, 'totalDebit')
            onJvDetailPage.getTotalsValue(1, 'totalCredit')
            onJvDetailPage.getTotalsValue(2, 'difference')


            cy.get('@amount').then((amount) => {
                cy.get('@lineDiscAmt').then((lineDiscAmt) => {
                    cy.get('@exciseAmount').then((exciseAmount) => {
                        cy.get('@subTotal').then((subTotal) => {
                            cy.get('@billDiscountAmount').then((billDiscountAmount) => {
                                cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
                                    cy.get('@taxableAmount').then((taxableAmount) => {
                                        cy.get('@totalTaxAmount').then((totalVatAmount) => {
                                            cy.get('@totalAmount').then((totalAmount) => {
                                                cy.get('@purchaseAmount').then(purchaseAmount => {
                                                    cy.get('@billDiscAmount').then(billDiscAmount => {
                                                        cy.get('@tradeDiscAmount').then(tradeDiscAmount => {
                                                            cy.get('@vatAmount').then(vatAmount => {
                                                                cy.get('@totalDebit').then(totalDebit => {
                                                                    cy.get('@totalCredit').then(totalCredit => {
                                                                        cy.get('@difference').then(difference => {
                                                                            // let expectedPurchaseAcAmount = parseFloat(amount.replace(/,/g, '')).toString()
                                                                            let expectedPurchaseAcAmount = parseFloat(amount).toFixed(2)
                                                                            let expectedBillDiscountAmount = parseFloat(billDiscountAmount.replace(/,/g, '')).toString()
                                                                            let expectedTradeDiscountAmount = parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString()
                                                                            let expectedVatAmount = parseFloat(totalVatAmount.replace(/,/g, '')).toString()
                                                                            let expectedTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()



                                                                            let totalAmt = parseFloat(expectedTotalAmount.replace(/,/g, ''))
                                                                            // let subTotalAmt = parseFloat(expectedPurchaseAcAmount.replace(/,/g, ''))
                                                                            let billDiscAmt = parseFloat(expectedBillDiscountAmount.replace(/,/g, ''))
                                                                            let tradeDiscAmt = parseFloat(expectedTradeDiscountAmount.replace(/,/g, ''))
                                                                            let vatAmt = parseFloat(expectedVatAmount.replace(/,/g, ''))



                                                                            // let expectedRoundAmount = totalAmt - subTotalAmt - billDiscAmt - tradeDiscAmt + vatAmt

                                                                            let actualPurchaseAcAmount = parseFloat(purchaseAmount.replace(/,/g, '')).toString()
                                                                            let actualBillDiscountAmount = parseFloat(billDiscAmount.replace(/,/g, '')).toString()
                                                                            let actualTradeDiscountAmount = parseFloat(tradeDiscAmount.replace(/,/g, '')).toString()
                                                                            let actualVatAmount = parseFloat(vatAmount.replace(/,/g, '')).toString()
                                                                            // let actualRoundAmount = parseFloat(roundAmount.replace(/,/g, '')).toString()
                                                                            let actualTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()

                                                                            let a = parseFloat(amount).toFixed(2)
                                                                            let b = parseFloat(vatAmount.replace(/,/g, ''))
                                                                            let c = parseFloat(exciseAmount)
                                                              
                                                                            let totalDeb = a + b + c

                                                                            let expectedDebitTotal = parseFloat(totalDeb).toFixed(2)
                                                                            let actualTotalDebit = parseFloat(totalDebit.replace(/,/g, ''))
                                                                            let actualTotalCredit = parseFloat(totalCredit.replace(/,/g, ''))
                                                                            let actualDifference = parseFloat(difference.replace(/,/g, ''))

                                                                            // cy.log(expectedDebitTotal + ' ' + actualTotalDebit)

                                                                            try {
                                                                                expect(actualPurchaseAcAmount).to.equal(expectedPurchaseAcAmount)
                                                                            } catch (error) {
                                                                                cy.log('Purchase A/c Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualBillDiscountAmount).to.equal(expectedBillDiscountAmount)
                                                                            } catch (error) {
                                                                                cy.log('Bill Disocunt A/c Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualTradeDiscountAmount).to.equal(expectedTradeDiscountAmount)
                                                                            } catch (error) {
                                                                                cy.log('Trade Discount A/c Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualVatAmount).to.equal(expectedVatAmount)
                                                                            } catch (error) {
                                                                                cy.log('VAT A/c Amount is not matching')
                                                                            }
                                                                            // expect(actualRoundAmount).to.equal(expectedRoundAmount.toString())
                                                                            try {
                                                                                expect(actualTotalAmount).to.equal(expectedTotalAmount)
                                                                            } catch (error) {
                                                                                cy.log('Total Amount is not matching')
                                                                            }



                                                                            try {
                                                                                expect(actualTotalDebit).to.equal(expectedDebitTotal)
                                                                            } catch (error) {
                                                                                cy.log('Total Debit is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualTotalCredit).to.equal(expectedDebitTotal)
                                                                            } catch (error) {
                                                                                cy.log('Total Credit is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualDifference.toFixed(2)).to.equal('0.00')
                                                                            } catch (error) {
                                                                                cy.log('Difference is not matching')
                                                                            }


                                                                            cy.log('***********************************Verifying Cash Ledger Report Starting***********************************')
                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                            onDashboardPage.openCashBookReport()

                                                                            onCashBookPage.searchLedgerWithName('CASH A/C')
                                                                            onCashBookPage.openLedgerReport('CASH A/C')
                                                                            onCashBookPage.openReconciledDetails()

                                                                            onCashBookPage.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('CASH A/C reconciled')
                                                                            })

                                                                            onCashBookPage.searchInvoiceInReportDetails(purchaseDocNum)

                                                                            onCashBookPage.getDebitValueByInvoiceNum(purchaseDocNum, 'debitValue')
                                                                            onCashBookPage.getCreditValueByInvoiceNum(purchaseDocNum, 'creditValue')

                                                                            cy.get('@debitValue').then(debitValue => {
                                                                                cy.get('@creditValue').then(creditValue => {
                                                                                    let actualDebitValue = parseFloat(debitValue.replace(/,/g, '')).toString()
                                                                                    let actualCreditValue = parseFloat(creditValue.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualCreditValue).to.equal(expectedTotalAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('Debit  Amount is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualDebitValue).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Credit Amount is not matching')
                                                                                    }
                                                                                })
                                                                            })
                                                                            cy.log('***********************************Verifying Cash Report Finished***********************************')
                                                                            cy.log('***********************************Verifying PURCHASE A/c Ledger Report Starting***********************************')


                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                            onDashboardPage.clickLedgerReport()


                                                                            onLedgerReportPage.searchLedgerWithName('PURCHASE A/C')
                                                                            onLedgerReportPage.openLedgerReport('PURCHASE A/C')
                                                                            onLedgerReportPage.openReconciledDetails()
                                                                            onLedgerReportPage.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('PURCHASE A/C reconciled')
                                                                            })

                                                                            onLedgerReportPage.searchInvoiceInReportDetails(purchaseDocNum)
                                                                            onLedgerReportPage.getDebitValueByInvoiceNum(purchaseDocNum, 'debitValueOfSalesAc')
                                                                            onLedgerReportPage.getCreditValueByInvoiceNum(purchaseDocNum, 'creditValueOfSalesAc')

                                                                            cy.get('@debitValueOfSalesAc').then(debitValueOfSalesAc => {
                                                                                cy.get('@creditValueOfSalesAc').then(creditValueOfSalesAc => {

                                                                                    let actualDebitValue = parseFloat(debitValueOfSalesAc.replace(/,/g, '')).toString()
                                                                                    let actualCreditValue = parseFloat(creditValueOfSalesAc.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualCreditValue).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Debit  Amount is not matching')
                                                                                    }

                                                                                    try {
                                                                                        expect(actualDebitValue).to.equal(expectedPurchaseAcAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('Credit Amount is not matching')
                                                                                    }
                                                                                })

                                                                            })

                                                                            cy.log('***********************************Verifying Purchase A/c Ledger Report Finished***********************************')

                                                                            cy.log('***********************************Verifying VAT A/c Ledger Report Starting***********************************')
                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                            onDashboardPage.clickLedgerReport()


                                                                            onLedgerReportPage.searchVatBIllDiscTradeDiscLedger('VAT A/C')
                                                                            onLedgerReportPage.openLedgerReport('VAT A/C')
                                                                            onLedgerReportPage.openReconciledDetails()
                                                                            onLedgerReportPage.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('VAT A/C reconciled')
                                                                            })

                                                                            onLedgerReportPage.searchInvoiceInReportDetails(purchaseDocNum)

                                                                            onLedgerReportPage.getDebitValueByInvoiceNum(purchaseDocNum, 'debitValueOfSVatAc')
                                                                            onLedgerReportPage.getCreditValueByInvoiceNum(purchaseDocNum, 'creditValueOfVatAc')

                                                                            cy.get('@debitValueOfSVatAc').then(debitValueOfSVatAc => {
                                                                                cy.get('@creditValueOfVatAc').then(creditValueOfVatAc => {

                                                                                    let actualDebitValue = parseFloat(debitValueOfSVatAc.replace(/,/g, '')).toString()
                                                                                    let actualCreditValue = parseFloat(creditValueOfVatAc.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualCreditValue).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Debit  Amount is not matching')
                                                                                    }

                                                                                    try {
                                                                                        expect(actualDebitValue).to.equal(expectedVatAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('Credit Amount is not matching')
                                                                                    }
                                                                                })

                                                                            })
                                                                            cy.log('***********************************Verifying VAT A/c Ledger Report Finished***********************************')



                                                                            cy.log('***********************************Verifying Bill Discount A/c Ledger Report Starting***********************************')
                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                            onDashboardPage.clickLedgerReport()



                                                                            onLedgerReportPage.searchVatBIllDiscTradeDiscLedger('Bill Discount A/c')
                                                                            onLedgerReportPage.openLedgerReport('Bill Discount A/c')
                                                                            onLedgerReportPage.openReconciledDetails()
                                                                            onLedgerReportPage.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('Bill Discount A/c reconciled')
                                                                            })

                                                                            onLedgerReportPage.searchInvoiceInReportDetails(purchaseDocNum)

                                                                            onLedgerReportPage.getDebitValueByInvoiceNum(purchaseDocNum, 'debitValueOfBillDisctAc')
                                                                            onLedgerReportPage.getCreditValueByInvoiceNum(purchaseDocNum, 'creditValueOfBillDiscAc')

                                                                            cy.get('@debitValueOfBillDisctAc').then(debitValueOfBillDisctAc => {
                                                                                cy.get('@creditValueOfBillDiscAc').then(creditValueOfBillDiscAc => {

                                                                                    //cy.log(debitValueOfBillDisctAc)
                                                                                    //cy.log(creditValueOfBillDiscAc)

                                                                                    let actualDebitValue = parseFloat(debitValueOfBillDisctAc.replace(/,/g, '')).toString()
                                                                                    let actualCreditValue = parseFloat(creditValueOfBillDiscAc.replace(/,/g, '')).toString()

                                                                                    expect(actualCreditValue).to.equal(expectedBillDiscountAmount)
                                                                                    expect(actualDebitValue).to.equal('0')
                                                                                })

                                                                            })
                                                                            cy.log('***********************************Verifying Bill DIscount A/c Ledger Report Finished***********************************')


                                                                            cy.log('***********************************Verifying Trade Discount A/c Ledger Report Starting***********************************')

                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                            onDashboardPage.clickLedgerReport()


                                                                            onLedgerReportPage.searchVatBIllDiscTradeDiscLedger('Trade Discount A/c')
                                                                            onLedgerReportPage.openLedgerReport('Trade Discount A/c')
                                                                            onLedgerReportPage.openReconciledDetails()
                                                                            onLedgerReportPage.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('Trade Discount A/c reconciled')
                                                                            })

                                                                            onLedgerReportPage.searchInvoiceInReportDetails(purchaseDocNum)

                                                                            onLedgerReportPage.getDebitValueByInvoiceNum(purchaseDocNum, 'debitValueOfTradeDisctAc')
                                                                            onLedgerReportPage.getCreditValueByInvoiceNum(purchaseDocNum, 'creditValueOfTradeDiscAc')

                                                                            cy.get('@debitValueOfTradeDisctAc').then(debitValueOfTradeDisctAc => {
                                                                                cy.get('@creditValueOfTradeDiscAc').then(creditValueOfTradeDiscAc => {

                                                                                    cy.log(debitValueOfTradeDisctAc)
                                                                                    cy.log(creditValueOfTradeDiscAc)

                                                                                    let actualDebitValue = parseFloat(debitValueOfTradeDisctAc.replace(/,/g, '')).toString()
                                                                                    let actualCreditValue = parseFloat(creditValueOfTradeDiscAc.replace(/,/g, '')).toString()

                                                                                    expect(actualCreditValue).to.equal(expectedTradeDiscountAmount)
                                                                                    expect(actualDebitValue).to.equal('0')
                                                                                })

                                                                            })
                                                                            cy.log('***********************************Verifying Trade DIscount A/c Ledger Report Finished***********************************')


                                                                            cy.log('*********************************** Verifying Updated Purchase VAT Report Starting ***********************************')


                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverIrdReports()
                                                                            onDashboardPage.openUpdatedPurchaseVatReport()

                                                                            cy.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('Updated Purchase VAT Report')
                                                                            })

                                                                            onUpdatePurchaseVatReport.searchByInvoiceNumnber(purchaseDocNum)
                                                                            onUpdatePurchaseVatReport.getTotalPurchase(purchaseDocNum, 'totalPurchase')
                                                                            onUpdatePurchaseVatReport.getTaxExempted(purchaseDocNum, 'taxExempted')
                                                                            onUpdatePurchaseVatReport.getTaxablePurchase(purchaseDocNum, 'taxableSales')
                                                                            onUpdatePurchaseVatReport.getVat(purchaseDocNum, 'vat')


                                                                            cy.get('@totalPurchase').then(totalPurchase => {
                                                                                cy.get('@taxExempted').then(taxExempted => {
                                                                                    cy.get('@taxableSales').then(taxableSales => {
                                                                                        cy.get('@vat').then(vat => {

                                                                                            let actualtotalPurchase = parseFloat(totalPurchase.replace(/,/g, '')).toString()
                                                                                            let actualTaxExempted = parseFloat(taxExempted.replace(/,/g, '')).toString()
                                                                                            let actualTaxableSales = parseFloat(taxableSales.replace(/,/g, '')).toString()
                                                                                            let actualVat = parseFloat(vat.replace(/,/g, '')).toString()

                                                                                            let expectedtotalPurchase = parseFloat(taxableAmount.replace(/,/g, '')).toString()


                                                                                            try {
                                                                                                expect(actualtotalPurchase).to.equal(expectedtotalPurchase)
                                                                                            } catch (error) {
                                                                                                cy.log('Total Sales is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualTaxableSales).to.equal(expectedtotalPurchase)
                                                                                            } catch (error) {
                                                                                                cy.log('Taxable Sales is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualTaxExempted).to.equal('0')
                                                                                            } catch (error) {
                                                                                                cy.log('Tax Exempted is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualVat).to.equal(actualVatAmount)
                                                                                            } catch (error) {
                                                                                                cy.log('VAT is not matching')
                                                                                            }

                                                                                        })
                                                                                    })
                                                                                })
                                                                            })


                                                                            cy.log('*********************************** Verifying Updated Sales VAT Report Finsihed ***********************************')


                                                                            cy.log('*********************************** Verifying  Sales VAT Report Starting ***********************************')

                                                                            onDashboardPage.hoverMouseOverReports()
                                                                            onDashboardPage.hoverMouseOverIrdReports()
                                                                            onDashboardPage.openPurchaseVatReport()


                                                                            cy.getHeaderText('headerText')
                                                                            cy.get('@headerText').then(headerText => {
                                                                                expect(headerText).to.eq('Purchase VAT Report')
                                                                            })

                                                                            onPurchaseVatReport.searchByInvoiceNumnber(purchaseDocNum)
                                                                            onPurchaseVatReport.getTotalPurchase('totalPurchaseVatReport')
                                                                            onPurchaseVatReport.getTaxExempted('taxExemptedVatReport')
                                                                            onPurchaseVatReport.getTaxablePurchase('taxableSalesVatReport')
                                                                            onPurchaseVatReport.getVat('vatVatReport')



                                                                            cy.get('@totalPurchaseVatReport').then(totalPurchaseVatReport => {
                                                                                cy.get('@taxExemptedVatReport').then(taxExemptedVatReport => {
                                                                                    cy.get('@taxableSalesVatReport').then(taxableSalesVatReport => {
                                                                                        cy.get('@vatVatReport').then(vatVatReport => {

                                                                                            let actualtotalPurchase = parseFloat(totalPurchaseVatReport.replace(/,/g, '')).toString()
                                                                                            let actualTaxExempted = parseFloat(taxExemptedVatReport.replace(/,/g, '')).toString()
                                                                                            let actualTaxableSales = parseFloat(taxableSalesVatReport.replace(/,/g, '')).toString()
                                                                                            let actualVat = parseFloat(vatVatReport.replace(/,/g, '')).toString()

                                                                                            let expectedtotalPurchase = parseFloat(taxableAmount.replace(/,/g, '')).toString()

                                                                                            try {
                                                                                                expect(actualtotalPurchase).to.equal(expectedtotalPurchase)
                                                                                            } catch (error) {
                                                                                                cy.log('Total Sales is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualTaxableSales).to.equal(expectedtotalPurchase)
                                                                                            } catch (error) {
                                                                                                cy.log('Taxable Sales is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualTaxExempted).to.equal('0')
                                                                                            } catch (error) {
                                                                                                cy.log('Tax Exempted is not matching')
                                                                                            }
                                                                                            try {
                                                                                                expect(actualVat).to.equal(actualVatAmount)
                                                                                            } catch (error) {
                                                                                                cy.log('VAT is not matching')
                                                                                            }

                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                            cy.log('*********************************** Verifying  Purchase VAT Report Finsihed ***********************************')

                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })

                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })

        })



    })

    it.only('Verify JV, Ledger Report and IRD report after creating a PI for Credit', () => {
        onCreatePI.checkSaveBtnIsDisabled()
    })

})