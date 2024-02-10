const currentDate = new Date();
const timestamp = currentDate.getTime();
let beforeDelete
let afterDelete


describe("Create Promotion Test", () => {
    let title
    let lastTwoCharactersBeforeDelete
    let lastTwoCharactersAfterDelete
    

    beforeEach(() => {
        cy.fixture('promotions').as('data'); // Load the fixture data
        cy.fixture('promotionsSKU').as('data1'); // Load the fixture data
        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        cy.get(':nth-child(1) > :nth-child(10) > :nth-child(1)').should("be.visible").trigger('mouseover')
        cy.get(":nth-child(1) > :nth-child(10) > ul > :nth-child(4)").should("be.visible").trigger('mouseover')
        cy.get("a[href='/configuration/others/promotion']").click()
        cy.get('h2').should("have.text", "Promotions")


    })

    it("Verify user can delete promotion using three dot menu", () => {
        title = "Multiple sku promotion" + timestamp
        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotion")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

        cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA HFD")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Coca")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Fanta")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Dates")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Normal")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Quantity")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue(">= (")

        cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(12)

        cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Discount")

        cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(2)

        cy.get(':nth-child(2) > .sc-jSUZER > span').click()

        cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
        cy.url().should('not.include', '/create')

        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(timestamp)

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
        cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")


        cy.get(':nth-child(1) > .text-right > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .sc-jSUZER > .sc-eDvSVe > .icon').should("be.visible").click()
        cy.get('.sc-gikAfH').should('be.visible').click()
        cy.get("header[class='evolve-dialog__header'] div h2").should('be.visible').should('have.text', "Confirmation Dialog")
        cy.get("div[class='evolve-dialog__body'] p").should('be.visible').should('have.text', "Are you sure you want to delete 1 promotion?")

        cy.get('.dSdSlu').click()

        cy.get(".alert-message").should('contain', 'Promotion Deleted Successfully')
        cy.url().should('not.include', '/create')

        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(timestamp).wait(1000)

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('not.exist')

        // cy.get('.gvjoda')




    })

    it("Verify promotion is not deleted when user clicks on cancel button", () => {
        title = "Multiple sku promotion" + timestamp
        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotion")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

        cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA HFD")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Coca")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Fanta")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Dates")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Normal")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Quantity")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue(">= (")

        cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(12)

        cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Discount")

        cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(2)

        cy.get(':nth-child(2) > .sc-jSUZER > span').click()

        cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
        cy.url().should('not.include', '/create')

        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(timestamp)

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
        cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")


        cy.get(':nth-child(1) > .text-right > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .sc-jSUZER > .sc-eDvSVe > .icon').should("be.visible").click()
        cy.get('.sc-gikAfH').should('be.visible').click()
        cy.get("header[class='evolve-dialog__header'] div h2").should('be.visible').should('have.text', "Confirmation Dialog")
        cy.get("div[class='evolve-dialog__body'] p").should('be.visible').should('have.text', "Are you sure you want to delete 1 promotion?")
        cy.get('.gvjoda').click()

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
        cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")






    })


    it("Verify user can delete multiple promotion", () => {

        
        cy.get(':nth-child(2) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(3) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(4) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()

        
        // cy.get('.info-display > .pagination-display-label').should("be.visible").invoke("text").then((text) => {
        //     let lastTwoCharactersBeforeDelete = text
        //     cy.log(lastTwoCharactersBeforeDelete)
        // })


        // cy.get('.info-display > .pagination-display-label').should("be.visible").then(($value) => {
        //      beforeDelete = $value.text()
        //     // cy.wrap(textValue).as('wrapValue')
        //     cy.log(beforeDelete)
        // })
        // cy.log(beforeDelete)


        cy.get('.del-btn').should("be.visible").click()
        cy.get("header[class='evolve-dialog__header'] div h2").should('be.visible').should('have.text', "Confirmation Dialog")
        cy.get('.evolve-dialog__body > span').should('be.visible').should('have.text', "Are you sure you want to delete 3 promotions?")
        // cy.get('.gvjoda').click()

        cy.get('.dSdSlu').click()
        cy.get(".alert-message").should('contain', 'Promotion Deleted Successfully')
        cy.url().should('not.include', '/create')




    })

    it("Verify promotion is not deleted when user clicks on cancel button in case of bulk delete", () => {

        
        cy.get(':nth-child(2) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(3) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(4) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()

        
        // cy.get('.info-display > .pagination-display-label').should("be.visible").invoke("text").then((text) => {
        //     let lastTwoCharactersBeforeDelete = text
        //     cy.log(lastTwoCharactersBeforeDelete)
        // })


        // cy.get('.info-display > .pagination-display-label').should("be.visible").then(($value) => {
        //      beforeDelete = $value.text()
        //     // cy.wrap(textValue).as('wrapValue')
        //     cy.log(beforeDelete)
        // })
        // cy.log(beforeDelete)


        cy.get('.del-btn').should("be.visible").click()
        cy.get("header[class='evolve-dialog__header'] div h2").should('be.visible').should('have.text', "Confirmation Dialog")
        cy.get('.evolve-dialog__body > span').should('be.visible').should('have.text', "Are you sure you want to delete 3 promotions?")
        cy.get('.gvjoda').click()

        cy.get(':nth-child(2) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(3) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()
        cy.get(':nth-child(4) > :nth-child(1) > .sc-iBYQkv > label > .control-label').should("be.visible").click()




    })



})