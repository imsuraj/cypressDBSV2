import Dashboard from "../../../support/PageObjects/DashboardPage";
import PurchaseInvoice from "../../../support/PageObjects/PurchaseInvoicePage";
import CreatePurchaseInvoice from "../../../support/PageObjects/CreatePurchaseInvoicePage";


const currentDate = new Date();
const timestamp = currentDate.getTime();


describe("Create Purchae Invoice Test", () => {

    const vendorInvoiceNumber = "UDN" + timestamp
    let purchaseDocNum
    let subTotal
    let billDisccount
    let tradeDiscount
    let taxableAmount
    let nonTaxableAmount
    let vatAmount
    let total
    let totalPurchase
    let taxExempted
    let taxablePurchase
    let VAT

    const dashboardPage = new Dashboard()
    const purchaseInvoice = new PurchaseInvoice()
    const createPurchaseInvoice = new CreatePurchaseInvoice()
    beforeEach(() => {
        cy.fixture('dbs_pi_sku').as('data'); // Load the fixture data
        
        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        cy.wait(1000)
        dashboardPage.hoverMouserOverPurchase()
        dashboardPage.clickPurchaseInvoice()
    })

    it.only("Check if purchage Invoice coppppppp is displayed", () => {
        purchaseInvoice.getHeaderText().should('have.text',"Purchase Invoice")
        purchaseInvoice.clickCreateIcon()
        createPurchaseInvoice.enterVendorInvoiceNumber(vendorInvoiceNumber)
        createPurchaseInvoice.selectBusinessUnit("HFD")
        createPurchaseInvoice.selectVendorLedger("Horlicks Nepal")
        createPurchaseInvoice.enterRemarks("Suraj")
        //Add SKU
        createPurchaseInvoice.addNewSKU("Horlicks Lite Jar 450 Gm X 24 INR 355 [UNL00201]", "1110BA5B", 10, 1, 2, 10, 10, 2)

        // cy.get('@data').then((data) => {
        //     data.forEach((sku) => {
        //         createPurchaseInvoice.clickAddNewLineBtn()
        //         createPurchaseInvoice.addNewSKU(sku.skuTitle, sku.batchName, sku.sellable, sku.damages, sku.shortages, sku.rate, sku.excise, sku.lineDisc)
        //     })
        // })

        //Enter Bill Disc

        createPurchaseInvoice.enterBillDiscount('1')
        createPurchaseInvoice.enterTradeDiscount('1')

    
        cy.get(':nth-child(1) > .calculated-value > span')
                .invoke('text')
                .then(text => {
                    // const subTotal = text.replace(/,/g, "")
                    // subTotal = text
                    cy.log("Subtotal: " + text)
                })

        cy.get(':nth-child(2) > .calculated-value')
                .invoke('text')
                .then(text => {
                    // const billDisccount = text.replace(/,/g, "")
                    billDisccount = text
                    cy.log("Bill Discount: " + billDisccount)
                })


        cy.get(':nth-child(3) > .calculated-value')
                .invoke('text')
                .then(text => {
                    // const tradeDiscount = text.replace(/,/g, "")
                    tradeDiscount = text
                    cy.log("Trade Discount: " + tradeDiscount)
                })


        cy.get(':nth-child(4) > .calculated-value > span')
                .invoke('text')
                .then(text => {
                    // const taxableAmount = text.replace(/,/g, "")
                    taxableAmount = text
                    cy.log("Taxable Amount: " + taxableAmount)
                })

        cy.get('.mb-24 > .calculated-value > span')
                .invoke('text')
                .then(text => {
                    // const vatAmount = text.replace(/,/g, "")
                    vatAmount = text
                    cy.log("Vat: " + vatAmount)
                })


        cy.get(':nth-child(6) > .calculated-value > span')
                .invoke('text')
                .then(text => {
                    // const total = text.replace(/,/g, "")
                    total = text
                    cy.log("Total Amount: " + total)
                })



        //const nonTaxableAmount = parseFloat(subTotal) - parseFloat(billDisccount) - parseFloat(tradeDiscount) - parseFloat(taxableAmount)
        // const nonTaxableAmount = subTotal - billDisccount - tradeDiscount - taxableAmount
        // cy.log('Non Taxable : ' + nonTaxableAmount)



        //click on save button
        // createPurchaseInvoice.clickSaveButton()
        // cy.wait(1000)
        // cy.url().should('not.include', '/create')



    })


    it.skip("Search PI", () => {
        // cy.get('.search-input > div > .sc-jSUZER').click()
        purchaseInvoice.clickOnSearchIcon()
        // cy.get('.sc-idXgbr').should('be.visible').click().type(vendorInvoiceNumber)
        purchaseInvoice.enterSearchText(vendorInvoiceNumber)


        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', vendorInvoiceNumber)
        cy.get('tbody > :nth-child(1) > :nth-child(2)')
            .invoke('text')
            .then(text => {
                purchaseDocNum = text
                cy.log("Purchase DOC Num: " + purchaseDocNum)
            })

    })

    it.skip("IRD Report -  Purchase VAT Report", () => {
        cy.visit("https://qa.dbs.rosia.one/reports/ird-reports/purchase-vat-report")
        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(vendorInvoiceNumber)

        cy.wait(2000)

        cy.get('tbody tr:nth-child(1) td:nth-child(4)').should('be.visible').should('have.text', vendorInvoiceNumber)
        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(4)')
            .scrollIntoView().should('be.visible').should('have.text', taxableAmount)



        // cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(5)')
        // .scrollIntoView().should('be.visible').should('have.text', nonTaxableAmount)


        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(6)')
            .scrollIntoView().should('be.visible').should('have.text', taxableAmount)

        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(7)')
            .scrollIntoView().should('be.visible').should('have.text', vatAmount)
    })

    it.skip("IRD Report -  Old Purchase VAT Report", () => {
        cy.visit("https://qa.dbs.rosia.one/reports/ird-reports/old-purchase-vat-report")
        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(vendorInvoiceNumber)

        cy.wait(2000)
        cy.get('tbody tr:nth-child(1) td:nth-child(4)').should('be.visible').should('have.text', vendorInvoiceNumber)

        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(4)')
            .scrollIntoView().should('be.visible').should('have.text', taxableAmount)

        // cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(5)')
        // .scrollIntoView().should('be.visible').should('have.text', nonTaxableAmount)


        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(6)')
            .scrollIntoView().should('be.visible').should('have.text', taxableAmount)

        cy.get('.MuiTableFooter-root > .MuiTableRow-root > :nth-child(7)')
            .scrollIntoView().should('be.visible').should('have.text', vatAmount)
    })



})