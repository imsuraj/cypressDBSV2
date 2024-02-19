export class DashboardPage {
    pageheader = "h2"

    purchaseMenu = "ul:nth-child(1) > li:nth-child(4) > button:nth-child(1)"
    purchaseInvoiceSubMenu = "a[href='/purchase/purchase-invoice']"
    purchaseInvoiceSubMenuUrl = 'purchase/purchase-invoice'

    purchaseReturnSubMenu = "a[href='/purchase/purchase-return-invoice']"
    servicePurchaseSubMenu = "a[href='/purchase/service-purchase']"



    salesMenu = "ul:nth-child(1) > li:nth-child(3) > button:nth-child(1)"
    salesInvoiceSubMenu = "a[href='/sales/sales-invoice']"
    salesInvoiceUrl = 'sales/sales-invoice'

    salesReturnSubMenu = "a[href='/purchase/sales-return-invoice']"
    serviceInvocieSubMenu = "a[href='/purchase/service-invoice']"

    accountingEntriesMenuEle = 'ul:nth-child(1) > li:nth-child(8) > button:nth-child(1)'
    journalVoucherSubMenu = "a[href='/accounting-entries/journal-voucher']"
    journalVoucherUrl = '/accounting-entries/journal-voucher'


    reportsMenuEle = 'ul:nth-child(1) > li:nth-child(9) > button:nth-child(1)'
    generalLedgerReportSubMenuEle = 'li:nth-child(9) > ul > li:nth-child(5) > button'
    ledgerReportSubMenuEle = "a[href='/reports/general-ledger-reports/ledger-report']"
    cashBookSubMenuEle = "a[href='/reports/general-ledger-reports/ledger-cash-report']"
    customerReportSubMenuEle = "a[href='/reports/general-ledger-reports/ledger-customer-report']"

    salesReportSubMenuEle = 'li:nth-child(9) > ul > li:nth-child(2) > button'
    psrEle = 'a[href="/reports/sales-reports/product-sales-report"]'
    nsrEle = 'a[href="/reports/sales-reports/net-sales-report"]'


    irdReportsEle = 'li:nth-child(9) > ul > li:nth-child(3) > button'
    updateSalesVatReportEle = 'a[href="/reports/ird-reports/old-sales-vat-report"]'
    salesVatReportEle = 'a[href="/reports/ird-reports/sales-vat-report"]'




    ledgerReportUrl = '/reports/general-ledger-reports/ledger-report'
    cashBookUrl = '/reports/general-ledger-reports/ledger-cash-report'
    customerReportUrl = '/reports/general-ledger-reports/ledger-customer-report'

    configurationMenuELe = 'ul:nth-child(1) > li:nth-child(10) > button:nth-child(1)'
    otherSubMenuELe = 'li:nth-child(10) > ul > li:nth-child(4) > button'
    promotionSubMenuEle = "a[href='/configuration/others/promotion']"

    catalogMenuELe = 'li:nth-child(10) > ul > li:nth-child(3) > button'
    businessUnitsELe = "a[href='/configuration/catalog/business-units']"



    hoverMouseOverConfiguration() {
        cy.get(this.configurationMenuELe).trigger('mouseover')
    }

    hoverMouseOverOther() {
        cy.get(this.otherSubMenuELe).trigger('mouseover')
    }

    openPromotion() {
        cy.get(this.promotionSubMenuEle).click({ force: true })
    }





    hoverMouserOverPurchase() {
        cy.get(this.purchaseMenu).trigger('mouseover')
    }

    clickPurchaseInvoice() {
        cy.get(this.purchaseInvoiceSubMenu).should("be.visible").click()
    }

    verifyPurchaseInvoiceUrl() {
        cy.url().should('include', this.purchaseInvoiceSubMenuUrl)
    }


    clickPurchaseReturnInvoice() {
        cy.get(this.purchaseReturnSubMenu).should("be.visible").click()
    }


    clickServicePurchase() {
        cy.get(this.servicePurchaseSubMenu).should("be.visible").click()
    }




    hoverMouserOverSales() {
        cy.get(this.salesMenu).trigger('mouseover')
    }

    clickSalesInvoice() {
        cy.get(this.salesInvoiceSubMenu).should("be.visible").click()
    }

    verifySalesInvoiceUrl() {
        cy.url().should('include', this.salesInvoiceUrl)
    }


    clickSalesReturnInvoice() {
        cy.get(this.salesReturnSubMenu).should("be.visible").click()
    }


    clickServiceInvoice() {
        cy.get(this.serviceInvocieSubMenu).should("be.visible").click()
    }



    hoverMouserOverAccountingEntries() {
        cy.get(this.accountingEntriesMenuEle).trigger('mouseover')
    }

    clickOnJournalVoucher() {
        cy.get(this.journalVoucherSubMenu).should("be.visible").click()
    }

    verifyJournalVoucherUrl() {
        cy.url().should('include', this.journalVoucherUrl)
    }


    hoverMouseOverReports() {
        cy.get(this.reportsMenuEle).should('be.visible').trigger('mouseover')
    }

    hoverMouseOverGeneralLedgerReport() {
        cy.get(this.generalLedgerReportSubMenuEle).trigger('mouseover')
    }

    clickLedgerReport() {
        cy.get(this.ledgerReportSubMenuEle).should("be.visible").click()
    }

    verifyLedgerReportUrl(url) {
        cy.url().should('include', url)
    }

    openCashBookReport() {
        // cy.get(this.cashBookSubMenuEle).should("be.visible").click()
        cy.contains('Cash Book').click({ force: true })
    }

    verifyCashBookReportUrl(url) {
        cy.url().should('include', url)
    }

    clickCustomerReport() {
        cy.get(this.customerReportSubMenuEle).should("be.visible").click()
    }

    verifyCustomerReportUrl(url) {
        cy.url().should('include', url)
    }


    hoverMouserOverSalesReports() {
        cy.get(this.salesReportSubMenuEle).trigger('mouseover')
    }

    clickProductSalesReport() {
        cy.get(this.psrEle).should("be.visible").click()
    }

    verifyProductSalesReportUrl(url) {
        cy.url().should('include', url)
    }

    clickNetSalesReport() {
        cy.get(this.nsrEle).should("be.visible").click()
    }

    verifyNetSalesReportUrl(url) {
        cy.url().should('include', url)
    }



    hoverMouseOverIrdReports() {
        cy.get(this.irdReportsEle).trigger('mouseover')
    }

    openUpdatedSalesVatReport() {
        // cy.get(this.updateSalesVatReportEle).should("be.visible").click()
        cy.contains('Updated Sales VAT').click({ force: true })
    }

    openSalesVatReport() {
        // cy.get(this.salesVatReportEle).should("be.visible").click()
        cy.contains('Sales VAT Report').click({ force: true })
    }

    hoverMouseOverCatalog() {
        cy.get(this.catalogMenuELe).trigger('mouseover')
    }

    openBusinessUnits() {
        cy.contains('Business Unit').click()
    }

    openBrand() {
        cy.contains('Brand').click()
    }

}

export const onDashboardPage = new DashboardPage()