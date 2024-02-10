const currentDate = new Date();
const timestamp = currentDate.getTime();

let existingPromotionId


describe("Create Promotion Test", () => {


    beforeEach(() => {
        cy.fixture('promotionSearch').as('data'); // Load the fixture data

        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.url().should('include', '/login')
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        cy.get(':nth-child(1) > :nth-child(10) > :nth-child(1)').should("be.visible").trigger('mouseover')
        cy.get(":nth-child(1) > :nth-child(10) > ul > :nth-child(4)").should("be.visible").trigger('mouseover')
        cy.get("a[href='/configuration/others/promotion']").click()
        cy.get('h2').should("have.text", "Promotions")
        cy.get('h2').click({force:true})


    })

    it("Verify edit icon is displayed in promotion detail", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)
            //click on first promotion
            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
        })
    })

    it("Verify user is redirected to list page after clicking cancel button", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)
            //click on first promotion
            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
        })

        cy.get(':nth-child(1) > .sc-jSUZER > span').click()
        cy.get('h2').should("be.visible").should("have.text", "Promotions")
        cy.url().should('include', '/promotion')

    })

    it("Verify title is updated and new promotion is not created when user update title", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
            cy.get('.col-lg-12 > .form-input > .sc-idXgbr').should("be.visible").clear().type(newPromotionTitle)

            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId)

        })
    })

    it("Verify description is updated and new promotion is not created when user update description only", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
            cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').should("be.visible").clear().type(newPromotionTitle)

            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId).click()

            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
            cy.wait(2000)
            // cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').should("be.visible").should('have.text',newPromotionTitle)

        })




    })

    it("Verify description is updated and new promotion is not created when user update both title and description", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()
            cy.get('.col-lg-12 > .form-input > .sc-idXgbr').should("be.visible").clear().type(newPromotionTitle)
            cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').should("be.visible").clear().type(newPromotionTitle)

            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId)


        })




    })


    it("Verify new promotion is created when user update start date of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()


            cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
            // cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()
            cy.selectDateFromCalendar('4')



            // cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
            // cy.selectDateFromCalendar('29')


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)



            // compare the two buttons' text
            // and make sure they are different
            // cy.get('button').should(($btn2) => {
            //   expect($btn2.text()).not.to.eq(txt)
            // })
        })

    })



    it("Verify new promotion is created when user updates end date of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()


            // cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
            // cy.selectDateFromCalendar('4')



            cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
            cy.selectDateFromCalendar('30')


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })

    })

    it("Verify new promotion is created when user update BU and Brand of an existing promotion", () => {

        const newBU = "QA BU"
        const newBrand = "QA Brand"
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
            cy.selectDropdownValue(newBU)

            cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
            cy.selectDropdownValue(newBrand)


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })

    it("Verify new promotion is created when user update sku of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()

            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                .wait(2000).type("dat{enter}")




            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })


    it("Verify new promotion is created when user update promotion condition of an existing promotion", () => {

        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()
           
            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
            cy.get(':nth-child(1) > .sc-jSUZER > span').should("be.visible")
            cy.wait(2000)



            cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').then(($btn) => {

                let promotionCondition
                // store the button's text
                promotionCondition = $btn.text()
                cy.log(promotionCondition)


                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()

                if (promotionCondition == "Amount") {
                    cy.selectDropdownValue("Quantity")
                }
                else {
                    cy.selectDropdownValue("Amount")
                }


            })


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })

    })

    it("Verify new promotion is created when user update promotion criteria of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()
           
            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
            cy.get(':nth-child(1) > .sc-jSUZER > span').should("be.visible")
            cy.wait(2000)



            cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').then(($btn) => {

                let promotionCondition
                // store the button's text
                promotionCondition = $btn.text()
                cy.log(promotionCondition)


                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()

                if (promotionCondition == ">= (GREATER THAN EQUALS)") {
                    cy.selectDropdownValue("> (GREATER THAN)")
                }
                else if (promotionCondition == "> (GREATER THAN)"){
                    cy.selectDropdownValue(">= (GREATER THAN EQUALS)")
                }

                else if (promotionCondition == "< (LESS THAN)"){
                    cy.selectDropdownValue("<= (LESS THAN EQUALS)")
                }
                else if (promotionCondition == "<= (LESS THAN EQUALS)"){
                    cy.selectDropdownValue("<= (LESS THAN)")
                }
                else if (promotionCondition == "= EQUALS"){
                    cy.selectDropdownValue(">= (GREATER THAN EQUALS)")
                }
                


            })


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })

    it("Verify new promotion is created when user update promotion condition value of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()
           
            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
            cy.get(':nth-child(1) > .sc-jSUZER > span').should("be.visible")
            cy.wait(2000)



            cy.get(':nth-child(4) > .form-input > .sc-idXgbr').clear().type(25)


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })

    it("Verify new promotion is created when user update Disbursement type of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()
           
            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
            cy.get(':nth-child(1) > .sc-jSUZER > span').should("be.visible")
            cy.wait(2000)



            cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').then(($btn) => {

                let promotionDisbursementType
                // store the button's text
                promotionDisbursementType = $btn.text()
                cy.log(promotionDisbursementType)


                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()

                if (promotionDisbursementType == "Amount (Rs)") {
                    cy.selectDropdownValue("Discount (%)")
                    cy.get(':nth-child(2) > .form-input > .sc-idXgbr').clear().type(2)
                }
                else {
                    cy.selectDropdownValue("Amount (Rs)")
                    cy.get(':nth-child(2) > .form-input > .sc-idXgbr').clear().type(200)
                }


            })


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })

    it("Verify new promotion is created when user update Disbursement value of an existing promotion", () => {
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').then(($btn) => {

            const newPromotionTitle = "New Title" + timestamp
            // store the button's text
            existingPromotionId = parseInt($btn.text(), 10)

            cy.log(existingPromotionId)
            cy.log(existingPromotionId + 2)


            cy.get('tbody > :nth-child(1) > :nth-child(3)').should("be.visible").click()
           
            cy.url().should('include', '/' + existingPromotionId)
            cy.get('.sc-jSUZER > .sc-eDvSVe').should("be.visible").click()

            cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
            cy.get(':nth-child(1) > .sc-jSUZER > span').should("be.visible")
            cy.wait(2000)



            cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(2.5)


            cy.get(':nth-child(2) > .sc-jSUZER > span').click()

            cy.get(".alert-message").should('be.visible').should('contain', 'Promotion Updated Successfully')
            cy.url().should('not.include', '/create')

            // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', newPromotionTitle)
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('be.visible').should('have.text', existingPromotionId + 1)




        })
    })











})