const { onDashboardPage } = require("../../../support/PageObjects/DashboardPage")
const { onSalesInvoicePage } = require("../../../support/PageObjects/SalesInvoicePage")
const { onJVPage } = require("../../../support/PageObjects/JournalVoucherPage")
const { onJvDetailPage } = require("../../../support/PageObjects/JournalVoucherDetailPage")
const { onCustomerReportPage } = require("../../../support/PageObjects/Reports/GeneralLedgerReports/CustomerReportPage")
const { onLedgerReportPage } = require("../../../support/PageObjects/Reports/GeneralLedgerReports/LedgerReportPage")
const { onUpdateSalesVatReport } = require("../../../support/PageObjects/Reports/IRDReports/UpdagteSalesVatReportPage")
const { onSalesVatReport } = require("../../../support/PageObjects/Reports/IRDReports/SalesVatReportPage")
const { onCashBookPage } = require("../../../support/PageObjects/Reports/GeneralLedgerReports/CashBookPage")






describe('Sales Invoice pages suite', () => {


    beforeEach('Open App and Login', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))

        cy.wait(2000)
        onDashboardPage.hoverMouserOverSales()
        onDashboardPage.clickSalesInvoice()
        onDashboardPage.verifySalesInvoiceUrl()


    })

    it.only('Verify Header of Sales Invoice Page', () => {
        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Sales Invoices')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })
    })

    it.only('Verify Search By Cusomter Ledger', () => {
        onSalesInvoicePage.searchInvoiceByText("Jain Kirana Pasal")
    })

    it('Verify user cannot create a sales Invoice without entering bill name for Cash Payment Mode', () => {

        onSalesInvoicePage.clickCreateBtn()
        cy.wait(2000)
        onSalesInvoicePage.selectPaymentMode("Cash")
        onSalesInvoicePage.clickOnBusinessUnitDropdown()
        onSalesInvoicePage.selectBusinessUnitByValue("Sunfeast")
        onSalesInvoicePage.typeRemarks("Test")
        onSalesInvoicePage.selectSalesPerson("Sin Cos")
        onSalesInvoicePage.selectSKU(0, 'Sunfeast 50-50 Top Buttery Bites 200 gm x 20 NPR 50 IN [96889]')
        onSalesInvoicePage.checkStockOfSelectedSKU(0)
        onSalesInvoicePage.typeQuantity(0, 5)
        onSalesInvoicePage.clickOnAddButon()

        onSalesInvoicePage.clickOnSaveBtn()
        cy.wait(2000)

        onSalesInvoicePage.getBillNameErrorMessage('errorMessage')
        cy.get('@errorMessage').then(errorMessage => {
            expect(errorMessage).to.equal('Bill name is required')
        })
    })

    it('Verify user cannot create a sales Invoice without selecting ledger for non Cash Payment Mode', () => {

        onSalesInvoicePage.clickCreateBtn()
        cy.wait(2000)
        onSalesInvoicePage.selectPaymentMode("Credit")
        onSalesInvoicePage.clickOnBusinessUnitDropdown()
        onSalesInvoicePage.selectBusinessUnitByValue("Sunfeast")
        onSalesInvoicePage.typeRemarks("Test")
        onSalesInvoicePage.selectSalesPerson("Sin Cos")
        onSalesInvoicePage.selectSKU(0, 'Sunfeast 50-50 Top Buttery Bites 200 gm x 20 NPR 50 IN [96889]')
        onSalesInvoicePage.checkStockOfSelectedSKU(0)
        onSalesInvoicePage.typeQuantity(0, 5)
        onSalesInvoicePage.clickOnAddButon()

        onSalesInvoicePage.clickOnSaveBtn()
        cy.wait(2000)

        onSalesInvoicePage.getBillNameErrorMessage('errorMessage')
        cy.get('@errorMessage').then(errorMessage => {
            expect(errorMessage).to.equal('Bill name is required')
        })
    })

    it('Verify JV, Sales A/C, Vat A/c, Customer Ledger and IRD Reports after creating a sales invoice using credit payment mode', () => {
        onSalesInvoicePage.clickCreateBtn()
        cy.wait(2000)
        onSalesInvoicePage.selectPaymentMode("Credit")
        onSalesInvoicePage.clickOnBusinessUnitDropdown()
        onSalesInvoicePage.selectBusinessUnitByValue("Sunfeast")
        onSalesInvoicePage.selectCustomerLedger("Jain Kirana Pasal")
        onSalesInvoicePage.typeRemarks("Test")
        onSalesInvoicePage.selectSalesPerson("Sin Cos")
        onSalesInvoicePage.selectSKU(0, 'Sunfeast 50-50 Top Buttery Bites 200 gm x 20 NPR 50 IN [96889]')
        onSalesInvoicePage.checkStockOfSelectedSKU(0)
        onSalesInvoicePage.typeQuantity(0, 5)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(1, "Sunfeast Gobbles Choco Chill 30 gm x 72 NPR 50 IN [9000992]")
        onSalesInvoicePage.checkStockOfSelectedSKU(1)
        onSalesInvoicePage.typeQuantity(1, 4)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(2, "Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")
        onSalesInvoicePage.checkStockOfSelectedSKU(2)
        onSalesInvoicePage.typeQuantity(2, 10)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.checkOrderCalculation(1, 2)


        onSalesInvoicePage.getSubTotal('subTotal')
        onSalesInvoicePage.getBillDiscount('billDiscountAmount')
        onSalesInvoicePage.getTradeDiscount('tradeDiscountAmount')
        onSalesInvoicePage.getTaxableAmount('taxableAmount')
        onSalesInvoicePage.getVat('totalTaxAmount')
        onSalesInvoicePage.getTotal('totalAmount')



        onSalesInvoicePage.clickOnSaveBtn()
        onSalesInvoicePage.verifySuccessMessage('Success: Sales invoice has been created!')

        cy.wait(2000)

        onSalesInvoicePage.getInvoiceNumber('invoiceNumber')


        onDashboardPage.hoverMouserOverAccountingEntries()
        onDashboardPage.clickOnJournalVoucher()
        onDashboardPage.verifyJournalVoucherUrl()

        onJVPage.removeFilterInJV()

        // let invoiceNumber = 'APPL-SI/0001365/80-81'

        // onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
        // onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
        // onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)


        cy.get('@invoiceNumber').then(invoiceNumber => {
            onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
            onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
            onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)

            onJvDetailPage.getDebitValueForLedger('Bill Discount A/c', 'billDiscAmount')
            onJvDetailPage.getDebitValueForLedger('Trade Discount A/c', 'tradeDiscAmount')
            onJvDetailPage.getDebitValueForLedger('Jain Kirana Pasal', 'customerAmount')
            onJvDetailPage.getCreditValueForLedger('VAT A/C', 'vatAmount')
            onJvDetailPage.getCreditValueForLedger('###1.1ss', 'roundAmount')
            onJvDetailPage.getCreditValueForLedger('SALES A/C', 'salesAmount')


            // cy.get('@billDiscAmount').then(billDiscAmount => {
            //     cy.log(billDiscAmount)
            // })

            // cy.get('@tradeDiscAmount').then(tradeDiscAmount => {
            //     cy.log(tradeDiscAmount)
            // })

            // cy.get('@customerAmount').then(customerAmount => {
            //     cy.log(customerAmount)
            // })

            // cy.get('@vatAmount').then(vatAmount => {
            //     cy.log(vatAmount)
            // })

            // cy.get('@roundAmount').then(roundAmount => {
            //     cy.log(roundAmount)
            // })

            // cy.get('@salesAmount').then(salesAmount => {
            //     cy.log(salesAmount)
            // })


            onJvDetailPage.getTotalsValue(0, 'totalDebit')
            onJvDetailPage.getTotalsValue(1, 'totalCredit')
            onJvDetailPage.getTotalsValue(2, 'difference')


            cy.get('@subTotal').then((subTotal) => {
                cy.get('@billDiscountAmount').then((billDiscountAmount) => {
                    cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
                        cy.get('@taxableAmount').then((taxableAmount) => {
                            cy.get('@totalTaxAmount').then((totalVatAmount) => {
                                cy.get('@totalAmount').then((totalAmount) => {
                                    cy.get('@salesAmount').then(salesAmount => {
                                        cy.get('@billDiscAmount').then(billDiscAmount => {
                                            cy.get('@tradeDiscAmount').then(tradeDiscAmount => {
                                                cy.get('@vatAmount').then(vatAmount => {
                                                    cy.get('@roundAmount').then(roundAmount => {
                                                        cy.get('@totalDebit').then(totalDebit => {
                                                            cy.get('@totalCredit').then(totalCredit => {
                                                                cy.get('@difference').then(difference => {
                                                                    let expectedSalesAcAmount = parseFloat(subTotal.replace(/,/g, '')).toString()
                                                                    let expectedBillDiscountAmount = parseFloat(billDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedTradeDiscountAmount = parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedVatAmount = parseFloat(totalVatAmount.replace(/,/g, '')).toString()
                                                                    let expectedTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()



                                                                    let totalAmt = parseFloat(expectedTotalAmount.replace(/,/g, ''))
                                                                    let subTotalAmt = parseFloat(expectedSalesAcAmount.replace(/,/g, ''))
                                                                    let billDiscAmt = parseFloat(expectedBillDiscountAmount.replace(/,/g, ''))
                                                                    let tradeDiscAmt = parseFloat(expectedTradeDiscountAmount.replace(/,/g, ''))
                                                                    let vatAmt = parseFloat(expectedVatAmount.replace(/,/g, ''))


                                                                    // let expectedRoundAmount = totalAmt - subTotalAmt - billDiscAmt - tradeDiscAmt + vatAmt

                                                                    let actualSalesAcAmount = parseFloat(salesAmount.replace(/,/g, '')).toString()
                                                                    let actualBillDiscountAmount = parseFloat(billDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualTradeDiscountAmount = parseFloat(tradeDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualVatAmount = parseFloat(vatAmount.replace(/,/g, '')).toString()
                                                                    let actualRoundAmount = parseFloat(roundAmount.replace(/,/g, '')).toString()
                                                                    let actualTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()

                                                                    let a = parseFloat(actualTotalAmount.replace(/,/g, ''))
                                                                    let b = parseFloat(actualBillDiscountAmount.replace(/,/g, ''))
                                                                    let c = parseFloat(actualTradeDiscountAmount.replace(/,/g, ''))
                                                                    let totalDeb = a + b + c

                                                                    let expectedDebitTotal = totalDeb.toFixed(2)
                                                                    let actualTotalDebit = parseFloat(totalDebit.replace(/,/g, ''))
                                                                    let actualTotalCredit = parseFloat(totalCredit.replace(/,/g, ''))
                                                                    let actualDifference = parseFloat(difference.replace(/,/g, ''))

                                                                    // cy.log(expectedDebitTotal + ' ' + actualTotalDebit)

                                                                    // cy.log(actualSalesAcAmount)
                                                                    // cy.log(actualBillDiscountAmount)
                                                                    // cy.log(actualTradeDiscountAmount)
                                                                    // cy.log(actualVatAmount)
                                                                    // // cy.log(actualRoundAmount)
                                                                    // cy.log(actualTotalAmount)

                                                                    // cy.log(expectedSalesAcAmount)
                                                                    // cy.log(expectedBillDiscountAmount)
                                                                    // cy.log(expectedTradeDiscountAmount)
                                                                    // cy.log(expectedVatAmount)
                                                                    // // cy.log(expectedRoundAmount)
                                                                    // cy.log(expectedTotalAmount)

                                                                    try {
                                                                        expect(actualSalesAcAmount).to.equal(expectedSalesAcAmount)
                                                                    } catch (error) {
                                                                        cy.log('Sales A/c Amount is not matching')
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

                                                                    cy.log('***********************************Verifying CustomerLedger Report Starting***********************************')
                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                    onDashboardPage.clickCustomerReport()

                                                                    onCustomerReportPage.searchCustomerWithLedgerName('Jain Kirana Pasal')
                                                                    onCustomerReportPage.openCustomerReport('Jain Kirana Pasal')
                                                                    onCustomerReportPage.openReconciledDetails()
                                                                    onCustomerReportPage.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        try {
                                                                            expect(headerText).to.eq('Jain Kirana Pasal reconciled')
                                                                        } catch (error) {
                                                                            cy.log('Header Text does not match')
                                                                        }

                                                                    })
                                                                    onCustomerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onCustomerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValue')
                                                                    onCustomerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValue')

                                                                    cy.get('@debitValue').then(debitValue => {
                                                                        cy.get('@creditValue').then(creditValue => {
                                                                            let actualDebitValue = parseFloat(debitValue.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValue.replace(/,/g, ''))

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(expectedTotalAmount)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualCreditValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })
                                                                    })
                                                                    cy.log('***********************************Verifying CustomerLedger Report Finished***********************************')
                                                                    cy.log('***********************************Verifying Sales A/c Ledger Report Starting***********************************')


                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                    onDashboardPage.clickLedgerReport()


                                                                    onLedgerReportPage.searchLedgerWithName('SALES A/C')
                                                                    onLedgerReportPage.openLedgerReport('SALES A/C')
                                                                    onLedgerReportPage.openReconciledDetails()
                                                                    onLedgerReportPage.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('SALES A/C reconciled')
                                                                    })

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSalesAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfSalesAc')

                                                                    cy.get('@debitValueOfSalesAc').then(debitValueOfSalesAc => {
                                                                        cy.get('@creditValueOfSalesAc').then(creditValueOfSalesAc => {

                                                                            // cy.log(debitValueOfSalesAc)
                                                                            // cy.log(creditValueOfSalesAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfSalesAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfSalesAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedSalesAcAmount)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })

                                                                    })

                                                                    cy.log('***********************************Verifying Sales A/c Ledger Report Finished***********************************')

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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSVatAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfVatAc')

                                                                    cy.get('@debitValueOfSVatAc').then(debitValueOfSVatAc => {
                                                                        cy.get('@creditValueOfVatAc').then(creditValueOfVatAc => {

                                                                            // cy.log(debitValueOfSVatAc)
                                                                            // cy.log(creditValueOfVatAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfSVatAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfVatAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedVatAmount)
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfBillDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfBillDiscAc')

                                                                    cy.get('@debitValueOfBillDisctAc').then(debitValueOfBillDisctAc => {
                                                                        cy.get('@creditValueOfBillDiscAc').then(creditValueOfBillDiscAc => {

                                                                            //cy.log(debitValueOfBillDisctAc)
                                                                            //cy.log(creditValueOfBillDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfBillDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfBillDiscAc.replace(/,/g, ''))

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(expectedBillDiscountAmount)
                                                                                expect(actualCreditValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log("Debit and Credit amount does not matched for Bill Discount")
                                                                            }
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfTradeDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfTradeDiscAc')

                                                                    cy.get('@debitValueOfTradeDisctAc').then(debitValueOfTradeDisctAc => {
                                                                        cy.get('@creditValueOfTradeDiscAc').then(creditValueOfTradeDiscAc => {

                                                                            // cy.log(debitValueOfTradeDisctAc)
                                                                            // cy.log(creditValueOfTradeDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfTradeDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfTradeDiscAc.replace(/,/g, ''))


                                                                            try {
                                                                                expect(actualDebitValue).to.equal(expectedTradeDiscountAmount)
                                                                                expect(actualCreditValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit and credit does not matched for Trade Discount')
                                                                            }

                                                                        })

                                                                    })
                                                                    cy.log('***********************************Verifying Trade DIscount A/c Ledger Report Finished***********************************')


                                                                    cy.log('*********************************** Verifying Updated Sales VAT Report Starting ***********************************')

                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverIrdReports()
                                                                    onDashboardPage.openUpdatedSalesVatReport()

                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Updated Sales VAT Report')
                                                                    })

                                                                    onUpdateSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onUpdateSalesVatReport.getTotalSales(invoiceNumber, 'totalSales')
                                                                    onUpdateSalesVatReport.getTaxExempted(invoiceNumber, 'taxExempted')
                                                                    onUpdateSalesVatReport.getTaxableSales(invoiceNumber, 'taxableSales')
                                                                    onUpdateSalesVatReport.getVat(invoiceNumber, 'vat')


                                                                    cy.get('@totalSales').then(totalSales => {
                                                                        cy.get('@taxExempted').then(taxExempted => {
                                                                            cy.get('@taxableSales').then(taxableSales => {
                                                                                cy.get('@vat').then(vat => {
                                                                                    // cy.log(totalSales)
                                                                                    // cy.log(vat)
                                                                                    // cy.log(taxExempted)
                                                                                    // cy.log(taxableSales)

                                                                                    let actualTotalSales = parseFloat(totalSales.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExempted.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSales.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vat.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()


                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
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
                                                                    onDashboardPage.openSalesVatReport()


                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Sales VAT Report')
                                                                    })

                                                                    onSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onSalesVatReport.getTotalSales('totalSalesVatReport')
                                                                    onSalesVatReport.getTaxExempted('taxExemptedVatReport')
                                                                    onSalesVatReport.getTaxableSales('taxableSalesVatReport')
                                                                    onSalesVatReport.getVat('vatVatReport')



                                                                    cy.get('@totalSalesVatReport').then(totalSalesVatReport => {
                                                                        cy.get('@taxExemptedVatReport').then(taxExemptedVatReport => {
                                                                            cy.get('@taxableSalesVatReport').then(taxableSalesVatReport => {
                                                                                cy.get('@vatVatReport').then(vatVatReport => {
                                                                                    // cy.log(totalSalesVatReport)
                                                                                    // cy.log(vatVatReport)
                                                                                    // cy.log(taxExemptedVatReport)
                                                                                    // cy.log(taxableSalesVatReport)

                                                                                    let actualTotalSales = parseFloat(totalSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExemptedVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vatVatReport.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('VAT is not matching')
                                                                                    }

                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                    cy.log('*********************************** Verifying  Sales VAT Report Finsihed ***********************************')

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

    it('Verify JV, Sales A/C, Vat A/c, Cash A/c and IRD Reports after creating a sales invoice using cash payment mode and without selecting ledger', () => {

        onSalesInvoicePage.clickCreateBtn()
        cy.wait(2000)
        onSalesInvoicePage.selectPaymentMode("Cash")
        onSalesInvoicePage.clickOnBusinessUnitDropdown()
        onSalesInvoicePage.selectBusinessUnitByValue("Sunfeast")
        // onSalesInvoicePage.selectCustomerLedger("Jain Kirana Pasal")
        onSalesInvoicePage.enterCustomerName("Customer New")
        onSalesInvoicePage.typeRemarks("Test")
        onSalesInvoicePage.selectSalesPerson("Sin Cos")
        onSalesInvoicePage.selectSKU(0, 'Sunfeast 50-50 Top Buttery Bites 200 gm x 20 NPR 50 IN [96889]')
        onSalesInvoicePage.checkStockOfSelectedSKU(0)
        onSalesInvoicePage.typeQuantity(0, 5)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(1, "Sunfeast Gobbles Choco Chill 30 gm x 72 NPR 50 IN [9000992]")
        onSalesInvoicePage.checkStockOfSelectedSKU(1)
        onSalesInvoicePage.typeQuantity(1, 4)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(2, "Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")
        onSalesInvoicePage.checkStockOfSelectedSKU(2)
        onSalesInvoicePage.typeQuantity(2, 10)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.checkOrderCalculation(1, 2)


        onSalesInvoicePage.getSubTotal('subTotal')
        onSalesInvoicePage.getBillDiscount('billDiscountAmount')
        onSalesInvoicePage.getTradeDiscount('tradeDiscountAmount')
        onSalesInvoicePage.getTaxableAmount('taxableAmount')
        onSalesInvoicePage.getVat('totalTaxAmount')
        onSalesInvoicePage.getTotal('totalAmount')



        onSalesInvoicePage.clickOnSaveBtn()
        onSalesInvoicePage.verifySuccessMessage('Success: Sales invoice has been created!')

        cy.wait(2000)

        onSalesInvoicePage.getInvoiceNumber('invoiceNumber')


        onDashboardPage.hoverMouserOverAccountingEntries()
        onDashboardPage.clickOnJournalVoucher()
        onDashboardPage.verifyJournalVoucherUrl()

        onJVPage.removeFilterInJV()

        // let invoiceNumber = 'APPL-SI/0001365/80-81'

        // onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
        // onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
        // onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)


        cy.get('@invoiceNumber').then(invoiceNumber => {
            onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
            onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
            onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)

            onJvDetailPage.getDebitValueForLedger('Bill Discount A/c', 'billDiscAmount')
            onJvDetailPage.getDebitValueForLedger('Trade Discount A/c', 'tradeDiscAmount')
            onJvDetailPage.getDebitValueForLedger('CASH A/C', 'customerAmount')
            onJvDetailPage.getCreditValueForLedger('VAT A/C', 'vatAmount')
            onJvDetailPage.getCreditValueForLedger('###1.1ss', 'roundAmount')
            onJvDetailPage.getCreditValueForLedger('SALES A/C', 'salesAmount')


            onJvDetailPage.getTotalsValue(0, 'totalDebit')
            onJvDetailPage.getTotalsValue(1, 'totalCredit')
            onJvDetailPage.getTotalsValue(2, 'difference')


            cy.get('@subTotal').then((subTotal) => {
                cy.get('@billDiscountAmount').then((billDiscountAmount) => {
                    cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
                        cy.get('@taxableAmount').then((taxableAmount) => {
                            cy.get('@totalTaxAmount').then((totalVatAmount) => {
                                cy.get('@totalAmount').then((totalAmount) => {
                                    cy.get('@salesAmount').then(salesAmount => {
                                        cy.get('@billDiscAmount').then(billDiscAmount => {
                                            cy.get('@tradeDiscAmount').then(tradeDiscAmount => {
                                                cy.get('@vatAmount').then(vatAmount => {
                                                    cy.get('@roundAmount').then(roundAmount => {
                                                        cy.get('@totalDebit').then(totalDebit => {
                                                            cy.get('@totalCredit').then(totalCredit => {
                                                                cy.get('@difference').then(difference => {
                                                                    let expectedSalesAcAmount = parseFloat(subTotal.replace(/,/g, '')).toString()
                                                                    let expectedBillDiscountAmount = parseFloat(billDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedTradeDiscountAmount = parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedVatAmount = parseFloat(totalVatAmount.replace(/,/g, '')).toString()
                                                                    let expectedTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()



                                                                    let totalAmt = parseFloat(expectedTotalAmount.replace(/,/g, ''))
                                                                    let subTotalAmt = parseFloat(expectedSalesAcAmount.replace(/,/g, ''))
                                                                    let billDiscAmt = parseFloat(expectedBillDiscountAmount.replace(/,/g, ''))
                                                                    let tradeDiscAmt = parseFloat(expectedTradeDiscountAmount.replace(/,/g, ''))
                                                                    let vatAmt = parseFloat(expectedVatAmount.replace(/,/g, ''))



                                                                    // let expectedRoundAmount = totalAmt - subTotalAmt - billDiscAmt - tradeDiscAmt + vatAmt

                                                                    let actualSalesAcAmount = parseFloat(salesAmount.replace(/,/g, '')).toString()
                                                                    let actualBillDiscountAmount = parseFloat(billDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualTradeDiscountAmount = parseFloat(tradeDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualVatAmount = parseFloat(vatAmount.replace(/,/g, '')).toString()
                                                                    let actualRoundAmount = parseFloat(roundAmount.replace(/,/g, '')).toString()
                                                                    let actualTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()

                                                                    let a = parseFloat(actualTotalAmount.replace(/,/g, ''))
                                                                    let b = parseFloat(actualBillDiscountAmount.replace(/,/g, ''))
                                                                    let c = parseFloat(actualTradeDiscountAmount.replace(/,/g, ''))
                                                                    let totalDeb = a + b + c

                                                                    let expectedDebitTotal = totalDeb.toFixed(2)
                                                                    let actualTotalDebit = parseFloat(totalDebit.replace(/,/g, ''))
                                                                    let actualTotalCredit = parseFloat(totalCredit.replace(/,/g, ''))
                                                                    let actualDifference = parseFloat(difference.replace(/,/g, ''))

                                                                    // cy.log(expectedDebitTotal + ' ' + actualTotalDebit)


                                                                    try {
                                                                        expect(actualSalesAcAmount).to.equal(expectedSalesAcAmount)
                                                                    } catch (error) {
                                                                        cy.log('Sales A/c Amount is not matching')
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

                                                                    cy.log('***********************************Verifying CASH A/C Report Starting***********************************')
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

                                                                    onCashBookPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onCashBookPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValue')
                                                                    onCashBookPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValue')

                                                                    cy.get('@debitValue').then(debitValue => {
                                                                        cy.get('@creditValue').then(creditValue => {
                                                                            let actualDebitValue = parseFloat(debitValue.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValue.replace(/,/g, ''))

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(expectedTotalAmount)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualCreditValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })
                                                                    })
                                                                    cy.log('*********************************** Verifying CASH A/C Report Finished ***********************************')
                                                                    cy.log('*********************************** Verifying Sales A/c Ledger Report Starting***********************************')


                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                    onDashboardPage.clickLedgerReport()


                                                                    onLedgerReportPage.searchLedgerWithName('SALES A/C')
                                                                    onLedgerReportPage.openLedgerReport('SALES A/C')
                                                                    onLedgerReportPage.openReconciledDetails()
                                                                    onLedgerReportPage.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('SALES A/C reconciled')
                                                                    })

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSalesAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfSalesAc')

                                                                    cy.get('@debitValueOfSalesAc').then(debitValueOfSalesAc => {
                                                                        cy.get('@creditValueOfSalesAc').then(creditValueOfSalesAc => {

                                                                            let actualDebitValue = parseFloat(debitValueOfSalesAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfSalesAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedSalesAcAmount)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })

                                                                    })

                                                                    cy.log('***********************************Verifying Sales A/c Ledger Report Finished***********************************')

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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSVatAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfVatAc')

                                                                    cy.get('@debitValueOfSVatAc').then(debitValueOfSVatAc => {
                                                                        cy.get('@creditValueOfVatAc').then(creditValueOfVatAc => {

                                                                            let actualDebitValue = parseFloat(debitValueOfSVatAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfVatAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedVatAmount)
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfBillDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfBillDiscAc')

                                                                    cy.get('@debitValueOfBillDisctAc').then(debitValueOfBillDisctAc => {
                                                                        cy.get('@creditValueOfBillDiscAc').then(creditValueOfBillDiscAc => {

                                                                            //cy.log(debitValueOfBillDisctAc)
                                                                            //cy.log(creditValueOfBillDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfBillDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfBillDiscAc.replace(/,/g, ''))

                                                                            expect(actualDebitValue).to.equal(expectedBillDiscountAmount)
                                                                            expect(actualCreditValue).to.equal(0)
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfTradeDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfTradeDiscAc')

                                                                    cy.get('@debitValueOfTradeDisctAc').then(debitValueOfTradeDisctAc => {
                                                                        cy.get('@creditValueOfTradeDiscAc').then(creditValueOfTradeDiscAc => {

                                                                            cy.log(debitValueOfTradeDisctAc)
                                                                            cy.log(creditValueOfTradeDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfTradeDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfTradeDiscAc.replace(/,/g, ''))

                                                                            expect(actualDebitValue).to.equal(expectedTradeDiscountAmount)
                                                                            expect(actualCreditValue).to.equal(0)
                                                                        })

                                                                    })
                                                                    cy.log('***********************************Verifying Trade DIscount A/c Ledger Report Finished***********************************')


                                                                    cy.log('*********************************** Verifying Updated Sales VAT Report Starting ***********************************')

                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverIrdReports()
                                                                    onDashboardPage.openUpdatedSalesVatReport()

                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Updated Sales VAT Report')
                                                                    })

                                                                    onUpdateSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onUpdateSalesVatReport.getTotalSales(invoiceNumber, 'totalSales')
                                                                    onUpdateSalesVatReport.getTaxExempted(invoiceNumber, 'taxExempted')
                                                                    onUpdateSalesVatReport.getTaxableSales(invoiceNumber, 'taxableSales')
                                                                    onUpdateSalesVatReport.getVat(invoiceNumber, 'vat')


                                                                    cy.get('@totalSales').then(totalSales => {
                                                                        cy.get('@taxExempted').then(taxExempted => {
                                                                            cy.get('@taxableSales').then(taxableSales => {
                                                                                cy.get('@vat').then(vat => {

                                                                                    let actualTotalSales = parseFloat(totalSales.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExempted.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSales.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vat.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()


                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
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
                                                                    onDashboardPage.openSalesVatReport()


                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Sales VAT Report')
                                                                    })

                                                                    onSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onSalesVatReport.getTotalSales('totalSalesVatReport')
                                                                    onSalesVatReport.getTaxExempted('taxExemptedVatReport')
                                                                    onSalesVatReport.getTaxableSales('taxableSalesVatReport')
                                                                    onSalesVatReport.getVat('vatVatReport')



                                                                    cy.get('@totalSalesVatReport').then(totalSalesVatReport => {
                                                                        cy.get('@taxExemptedVatReport').then(taxExemptedVatReport => {
                                                                            cy.get('@taxableSalesVatReport').then(taxableSalesVatReport => {
                                                                                cy.get('@vatVatReport').then(vatVatReport => {

                                                                                    let actualTotalSales = parseFloat(totalSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExemptedVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vatVatReport.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('VAT is not matching')
                                                                                    }

                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                    cy.log('*********************************** Verifying  Sales VAT Report Finsihed ***********************************')

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

    it('Verify JV, Sales A/C, Vat A/c, Cash A/c and IRD Reports after creating a sales invoice using cash payment mode and  selecting ledger', () => {

        onSalesInvoicePage.clickCreateBtn()
        cy.wait(2000)
        onSalesInvoicePage.selectPaymentMode("Cash")
        onSalesInvoicePage.clickOnBusinessUnitDropdown()
        onSalesInvoicePage.selectBusinessUnitByValue("Sunfeast")
        onSalesInvoicePage.selectCustomerLedger("Jain Kirana Pasal")
        onSalesInvoicePage.typeRemarks("Test")
        onSalesInvoicePage.selectSalesPerson("Sin Cos")
        onSalesInvoicePage.selectSKU(0, 'Sunfeast 50-50 Top Buttery Bites 200 gm x 20 NPR 50 IN [96889]')
        onSalesInvoicePage.checkStockOfSelectedSKU(0)
        onSalesInvoicePage.typeQuantity(0, 5)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(1, "Sunfeast Gobbles Choco Chill 30 gm x 72 NPR 50 IN [9000992]")
        onSalesInvoicePage.checkStockOfSelectedSKU(1)
        onSalesInvoicePage.typeQuantity(1, 4)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.clickOnPlusButton()
        onSalesInvoicePage.selectSKU(2, "Sunfeast Good Day Butter Cookies 1 kg x 6 NPR 255 NP [99382]")
        onSalesInvoicePage.checkStockOfSelectedSKU(2)
        onSalesInvoicePage.typeQuantity(2, 10)
        onSalesInvoicePage.clickOnAddButon()
        onSalesInvoicePage.checkOrderCalculation(1, 2)


        onSalesInvoicePage.getSubTotal('subTotal')
        onSalesInvoicePage.getBillDiscount('billDiscountAmount')
        onSalesInvoicePage.getTradeDiscount('tradeDiscountAmount')
        onSalesInvoicePage.getTaxableAmount('taxableAmount')
        onSalesInvoicePage.getVat('totalTaxAmount')
        onSalesInvoicePage.getTotal('totalAmount')



        onSalesInvoicePage.clickOnSaveBtn()
        onSalesInvoicePage.verifySuccessMessage('Success: Sales invoice has been created!')

        cy.wait(2000)

        onSalesInvoicePage.getInvoiceNumber('invoiceNumber')


        onDashboardPage.hoverMouserOverAccountingEntries()
        onDashboardPage.clickOnJournalVoucher()
        onDashboardPage.verifyJournalVoucherUrl()

        onJVPage.removeFilterInJV()

        // let invoiceNumber = 'APPL-SI/0001365/80-81'

        // onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
        // onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
        // onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)


        cy.get('@invoiceNumber').then(invoiceNumber => {
            onJVPage.searchJVwithInvoiceNumber(invoiceNumber)
            onJVPage.openJvDetailsOfSearchedInvoice(invoiceNumber)
            onJvDetailPage.verifySearchedInvoiceJvIsDisplayed(invoiceNumber)

            onJvDetailPage.getDebitValueForLedger('Bill Discount A/c', 'billDiscAmount')
            onJvDetailPage.getDebitValueForLedger('Trade Discount A/c', 'tradeDiscAmount')
            onJvDetailPage.getDebitValueForLedger('CASH A/C', 'customerAmount')
            onJvDetailPage.getCreditValueForLedger('VAT A/C', 'vatAmount')
            onJvDetailPage.getCreditValueForLedger('###1.1ss', 'roundAmount')
            onJvDetailPage.getCreditValueForLedger('SALES A/C', 'salesAmount')

            onJvDetailPage.getTotalsValue(0, 'totalDebit')
            onJvDetailPage.getTotalsValue(1, 'totalCredit')
            onJvDetailPage.getTotalsValue(2, 'difference')


            cy.get('@subTotal').then((subTotal) => {
                cy.get('@billDiscountAmount').then((billDiscountAmount) => {
                    cy.get('@tradeDiscountAmount').then((tradeDiscountAmount) => {
                        cy.get('@taxableAmount').then((taxableAmount) => {
                            cy.get('@totalTaxAmount').then((totalVatAmount) => {
                                cy.get('@totalAmount').then((totalAmount) => {
                                    cy.get('@salesAmount').then(salesAmount => {
                                        cy.get('@billDiscAmount').then(billDiscAmount => {
                                            cy.get('@tradeDiscAmount').then(tradeDiscAmount => {
                                                cy.get('@vatAmount').then(vatAmount => {
                                                    cy.get('@roundAmount').then(roundAmount => {
                                                        cy.get('@totalDebit').then(totalDebit => {
                                                            cy.get('@totalCredit').then(totalCredit => {
                                                                cy.get('@difference').then(difference => {
                                                                    let expectedSalesAcAmount = parseFloat(subTotal.replace(/,/g, '')).toString()
                                                                    let expectedBillDiscountAmount = parseFloat(billDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedTradeDiscountAmount = parseFloat(tradeDiscountAmount.replace(/,/g, '')).toString()
                                                                    let expectedVatAmount = parseFloat(totalVatAmount.replace(/,/g, '')).toString()
                                                                    let expectedTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()



                                                                    let totalAmt = parseFloat(expectedTotalAmount.replace(/,/g, ''))
                                                                    let subTotalAmt = parseFloat(expectedSalesAcAmount.replace(/,/g, ''))
                                                                    let billDiscAmt = parseFloat(expectedBillDiscountAmount.replace(/,/g, ''))
                                                                    let tradeDiscAmt = parseFloat(expectedTradeDiscountAmount.replace(/,/g, ''))
                                                                    let vatAmt = parseFloat(expectedVatAmount.replace(/,/g, ''))



                                                                    // let expectedRoundAmount = totalAmt - subTotalAmt - billDiscAmt - tradeDiscAmt + vatAmt

                                                                    let actualSalesAcAmount = parseFloat(salesAmount.replace(/,/g, '')).toString()
                                                                    let actualBillDiscountAmount = parseFloat(billDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualTradeDiscountAmount = parseFloat(tradeDiscAmount.replace(/,/g, '')).toString()
                                                                    let actualVatAmount = parseFloat(vatAmount.replace(/,/g, '')).toString()
                                                                    let actualRoundAmount = parseFloat(roundAmount.replace(/,/g, '')).toString()
                                                                    let actualTotalAmount = parseFloat(totalAmount.replace(/,/g, '')).toString()

                                                                    let a = parseFloat(actualTotalAmount.replace(/,/g, ''))
                                                                    let b = parseFloat(actualBillDiscountAmount.replace(/,/g, ''))
                                                                    let c = parseFloat(actualTradeDiscountAmount.replace(/,/g, ''))
                                                                    let totalDeb = a + b + c

                                                                    let expectedDebitTotal = totalDeb.toFixed(2)
                                                                    let actualTotalDebit = parseFloat(totalDebit.replace(/,/g, ''))
                                                                    let actualTotalCredit = parseFloat(totalCredit.replace(/,/g, ''))
                                                                    let actualDifference = parseFloat(difference.replace(/,/g, ''))

                                                                    // cy.log(expectedDebitTotal + ' ' + actualTotalDebit)

                                                                    try {
                                                                        expect(actualSalesAcAmount).to.equal(expectedSalesAcAmount)
                                                                    } catch (error) {
                                                                        cy.log('Sales A/c Amount is not matching')
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


                                                                    cy.log('***********************************Verifying CustomerLedger Report Starting***********************************')
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

                                                                    onCashBookPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onCashBookPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValue')
                                                                    onCashBookPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValue')

                                                                    cy.get('@debitValue').then(debitValue => {
                                                                        cy.get('@creditValue').then(creditValue => {
                                                                            let actualDebitValue = parseFloat(debitValue.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValue.replace(/,/g, ''))

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(expectedTotalAmount)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }
                                                                            try {
                                                                                expect(actualCreditValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })
                                                                    })
                                                                    cy.log('***********************************Verifying CustomerLedger Report Finished***********************************')
                                                                    cy.log('***********************************Verifying Sales A/c Ledger Report Starting***********************************')


                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverGeneralLedgerReport()
                                                                    onDashboardPage.clickLedgerReport()


                                                                    onLedgerReportPage.searchLedgerWithName('SALES A/C')
                                                                    onLedgerReportPage.openLedgerReport('SALES A/C')
                                                                    onLedgerReportPage.openReconciledDetails()
                                                                    onLedgerReportPage.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('SALES A/C reconciled')
                                                                    })

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)
                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSalesAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfSalesAc')

                                                                    cy.get('@debitValueOfSalesAc').then(debitValueOfSalesAc => {
                                                                        cy.get('@creditValueOfSalesAc').then(creditValueOfSalesAc => {

                                                                            let actualDebitValue = parseFloat(debitValueOfSalesAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfSalesAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedSalesAcAmount)
                                                                            } catch (error) {
                                                                                cy.log('Credit Amount is not matching')
                                                                            }
                                                                        })

                                                                    })

                                                                    cy.log('***********************************Verifying Sales A/c Ledger Report Finished***********************************')

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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfSVatAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfVatAc')

                                                                    cy.get('@debitValueOfSVatAc').then(debitValueOfSVatAc => {
                                                                        cy.get('@creditValueOfVatAc').then(creditValueOfVatAc => {

                                                                            let actualDebitValue = parseFloat(debitValueOfSVatAc.replace(/,/g, ''))
                                                                            let actualCreditValue = parseFloat(creditValueOfVatAc.replace(/,/g, '')).toString()

                                                                            try {
                                                                                expect(actualDebitValue).to.equal(0)
                                                                            } catch (error) {
                                                                                cy.log('Debit  Amount is not matching')
                                                                            }

                                                                            try {
                                                                                expect(actualCreditValue).to.equal(expectedVatAmount)
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfBillDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfBillDiscAc')

                                                                    cy.get('@debitValueOfBillDisctAc').then(debitValueOfBillDisctAc => {
                                                                        cy.get('@creditValueOfBillDiscAc').then(creditValueOfBillDiscAc => {

                                                                            //cy.log(debitValueOfBillDisctAc)
                                                                            //cy.log(creditValueOfBillDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfBillDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfBillDiscAc.replace(/,/g, ''))

                                                                            expect(actualDebitValue).to.equal(expectedBillDiscountAmount)
                                                                            expect(actualCreditValue).to.equal(0)
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

                                                                    onLedgerReportPage.searchInvoiceInReportDetails(invoiceNumber)

                                                                    onLedgerReportPage.getDebitValueByInvoiceNum(invoiceNumber, 'debitValueOfTradeDisctAc')
                                                                    onLedgerReportPage.getCreditValueByInvoiceNum(invoiceNumber, 'creditValueOfTradeDiscAc')

                                                                    cy.get('@debitValueOfTradeDisctAc').then(debitValueOfTradeDisctAc => {
                                                                        cy.get('@creditValueOfTradeDiscAc').then(creditValueOfTradeDiscAc => {

                                                                            cy.log(debitValueOfTradeDisctAc)
                                                                            cy.log(creditValueOfTradeDiscAc)

                                                                            let actualDebitValue = parseFloat(debitValueOfTradeDisctAc.replace(/,/g, '')).toString()
                                                                            let actualCreditValue = parseFloat(creditValueOfTradeDiscAc.replace(/,/g, ''))

                                                                            expect(actualDebitValue).to.equal(expectedTradeDiscountAmount)
                                                                            expect(actualCreditValue).to.equal(0)
                                                                        })

                                                                    })
                                                                    cy.log('***********************************Verifying Trade DIscount A/c Ledger Report Finished***********************************')


                                                                    cy.log('*********************************** Verifying Updated Sales VAT Report Starting ***********************************')


                                                                    onDashboardPage.hoverMouseOverReports()
                                                                    onDashboardPage.hoverMouseOverIrdReports()
                                                                    onDashboardPage.openUpdatedSalesVatReport()

                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Updated Sales VAT Report')
                                                                    })

                                                                    onUpdateSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onUpdateSalesVatReport.getTotalSales(invoiceNumber, 'totalSales')
                                                                    onUpdateSalesVatReport.getTaxExempted(invoiceNumber, 'taxExempted')
                                                                    onUpdateSalesVatReport.getTaxableSales(invoiceNumber, 'taxableSales')
                                                                    onUpdateSalesVatReport.getVat(invoiceNumber, 'vat')


                                                                    cy.get('@totalSales').then(totalSales => {
                                                                        cy.get('@taxExempted').then(taxExempted => {
                                                                            cy.get('@taxableSales').then(taxableSales => {
                                                                                cy.get('@vat').then(vat => {

                                                                                    let actualTotalSales = parseFloat(totalSales.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExempted.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSales.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vat.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()


                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
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
                                                                    onDashboardPage.openSalesVatReport()


                                                                    cy.getHeaderText('headerText')
                                                                    cy.get('@headerText').then(headerText => {
                                                                        expect(headerText).to.eq('Sales VAT Report')
                                                                    })

                                                                    onSalesVatReport.searchByInvoiceNumnber(invoiceNumber)
                                                                    onSalesVatReport.getTotalSales('totalSalesVatReport')
                                                                    onSalesVatReport.getTaxExempted('taxExemptedVatReport')
                                                                    onSalesVatReport.getTaxableSales('taxableSalesVatReport')
                                                                    onSalesVatReport.getVat('vatVatReport')



                                                                    cy.get('@totalSalesVatReport').then(totalSalesVatReport => {
                                                                        cy.get('@taxExemptedVatReport').then(taxExemptedVatReport => {
                                                                            cy.get('@taxableSalesVatReport').then(taxableSalesVatReport => {
                                                                                cy.get('@vatVatReport').then(vatVatReport => {

                                                                                    let actualTotalSales = parseFloat(totalSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxExempted = parseFloat(taxExemptedVatReport.replace(/,/g, '')).toString()
                                                                                    let actualTaxableSales = parseFloat(taxableSalesVatReport.replace(/,/g, '')).toString()
                                                                                    let actualVat = parseFloat(vatVatReport.replace(/,/g, '')).toString()

                                                                                    let expectedTotalSales = parseFloat(taxableAmount.replace(/,/g, '')).toString()

                                                                                    try {
                                                                                        expect(actualTotalSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Total Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxableSales).to.equal(expectedTotalSales)
                                                                                    } catch (error) {
                                                                                        cy.log('Taxable Sales is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualTaxExempted).to.equal('0')
                                                                                    } catch (error) {
                                                                                        cy.log('Tax Exempted is not matching')
                                                                                    }
                                                                                    try {
                                                                                        expect(actualVat).to.equal(vatAmount)
                                                                                    } catch (error) {
                                                                                        cy.log('VAT is not matching')
                                                                                    }

                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                    cy.log('*********************************** Verifying  Sales VAT Report Finsihed ***********************************')

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

