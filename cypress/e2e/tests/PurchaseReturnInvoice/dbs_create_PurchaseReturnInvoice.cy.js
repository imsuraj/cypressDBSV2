const currentDate = new Date();
const timestamp = currentDate.getTime();


describe("Create Purchae Return Invoice Test", () => {

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


    beforeEach(() => {
        cy.fixture('dbs_pi_sku').as('data'); // Load the fixture data
        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        cy.get(':nth-child(1) > :nth-child(4) > button').trigger('mouseover')
        cy.get("a[href='/purchase/purchase-return']").click()
    })

    it("Check if purchage Invoiuce page is displayed", () => {
        cy.get('h2').should('be.visible').should('have.text', "Purchase Return")
        cy.get('.sc-UpCWa:contains("Date")').should('be.visible')

        //Click on plus icon to create a PI
        cy.get("button[class='sc-jSUZER kHoScB primary iconBtnSmall '] span[class='sc-eDvSVe Dpiax']").click()
        //ENter Vendor Invoice Number
        cy.get(':nth-child(1) > .radio-list > input').click()
        cy.get("input[placeholder='Purchase Doc Number']").type(vendorInvoiceNumber)

        //Select BU
        cy.get('.sc-pyfCe:contains("BU") + .select-css')
            .find('.zindex-2__control')
            .click()
            .type("QA HFD {enter}")

        //Selet Vendor Name

        cy.get('.customer-name > .form-select-input').should('exist').should('not.be.disabled').click().wait(2000)
        cy.get('.customer-name > .form-select-input').type("Horlicks Nepal{enter}")

        //ENter Remarks
        cy.get("input[placeholder='Remarks']").type("By Suraj")
        //Add SKU

        //cy.addSKUforPI("Badminton Racket [Boost-Promo] [UNL00072]", "sun-009/21-22 ", 10, 1, 2, 10, 10, 2)


        cy.get('@data').then((data) => {
            data.forEach((sku) => {
                cy.get('.add-btn').click()
                cy.addSKUforPRN(sku.skuTitle, sku.batchName, sku.sellable, sku.damages, sku.shortages, sku.rate, sku.excise, sku.lineDisc)

            })
        })

        //Enter Bill Disc

        cy.get(':nth-child(2) > .left > :nth-child(3) > .form-input > .sc-idXgbr').type('1')
        cy.get(':nth-child(3) > .left > :nth-child(3) > .form-input > .sc-idXgbr').type('1')



        cy.get(':nth-child(1) > .calculated-value > span')
                .invoke('text')
                .then(text => {
                    // const subTotal = text.replace(/,/g, "")
                    subTotal = text
                    cy.log("Subtotal: " + subTotal)
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
        cy.get("button[type='submit'] span").click()
        cy.wait(1000)
        cy.url().should('not.include', '/create')



    })

    it.skip("Search PI", () => {
        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(vendorInvoiceNumber)

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