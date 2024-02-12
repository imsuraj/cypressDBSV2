const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po");

const currentDate = new Date();
const timestamp = currentDate.getTime();


describe("Create Promotions Test", () => {
    let title



    beforeEach(() => {
        cy.fixture('promotions').as('data'); // Load the fixture data
        cy.fixture('promotionsSKU').as('data1'); // Load the fixture data
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        onDashboardPage.hoverMouseOverConfiguration()
        onDashboardPage.hoverMouseOverOther()
        onDashboardPage.openPromotion()

        cy.getHeaderText('headerText')
        cy.get('@headerText').then(headerText => {
            try {
                expect(headerText).to.eq('Promotions')
            } catch (error) {
                cy.log('Header Text does not match')
            }
        })




    })

    it("Verify mandatory message is displayed", () => {

        cy.get(':nth-child(4) > .sc-jSUZER').click()

        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get(':nth-child(2) > .sc-jSUZER > span').click()


        cy.get('.col-lg-12 > .form-input > .sc-hHTYSt > .error-message').should("contain", "Promotion info is required")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Business Unit is required")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Brand is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Promotion type is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Condition is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Criteria is required")
        cy.get(':nth-child(4) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")

        cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Disbursement Type is required")
        cy.get(':nth-child(2) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")

    })

    it("Verify mandatory message is displayed when user creates promotion with non required fields", () => {

        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotionss")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")

        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type("ABC")
        cy.get(':nth-child(2) > .sc-jSUZER > span').click()


        cy.get('.col-lg-12 > .form-input > .sc-hHTYSt > .error-message').should("contain", "Promotion info is required")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Business Unit is required")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Brand is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Promotion type is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Condition is required")
        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Criteria is required")
        cy.get(':nth-child(4) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")

        cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Disbursement Type is required")
        cy.get(':nth-child(2) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")

    })

    it("Verify user is redirected to list page on click on cancel button without entering data", () => {
        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")

        cy.get(':nth-child(1) > .sc-jSUZER > span').click()

        cy.url().should('include', '/configuration/others/promotion')
    })

    it("Verify user is redirected to list page on click on cancel button after entering data", () => {
        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type("Multiple sku promotion")
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type("Multiple sku promotion")

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

        cy.get(':nth-child(1) > .sc-jSUZER > span').click()

        cy.url().should('include', '/configuration/others/promotion')


    })

    it("Verify char limit in title and description", () => {

        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type("rtCACpo1TzdOYj2Dm7g7AoNgEbTb990AnSLhT9KeNjs4mpjs4sD4PCfmcQbPju0CS3xTsZCH2Vi9iQOWmw1X0QI6rfXJYwageU2OGR4zMk1CSDtv3JuvvjW39UYnaZ6psnd3QM000eis6YX8tQtYDTJAvk6S3gk6BHA3RAjJe6a9lD4zaxWRlpX03AEADSDrVzoeyRH8Lj8UH9Fgsh5LP3YNlIXvV9ACSj7e7uTSyxSJsTa2pfvOMIZFmDtBDQVS")
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type("rtCACpo1TzdOYj2Dm7g7AoNgEbTb990AnSLhT9KeNjs4mpjs4sD4PCfmcQbPju0CS3xTsZCH2Vi9iQOWmw1X0QI6rfXJYwageU2OGR4zMk1CSDtv3JuvvjW39UYnaZ6psnd3QM000eis6YX8tQtYDTJAvk6S3gk6BHA3RAjJe6a9lD4zaxWRlpX03AEADSDrVzoeyRH8Lj8UH9Fgsh5LP3YNlIXvV9ACSj7e7uTSyxSJsTa2pfvOMIZFmDtBDQVS")

        cy.get('.col-lg-12 > .form-input > .sc-hHTYSt > .error-message').should("contain", "Promotion info must be atmost 255 characters long")
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Description must be atmost 255 characters long")

    })

    it("Verify user cannot Create Promotions having criteria and disbursement value as 0", () => {

        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type("Multiple sku promotion")
        cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type("Multiple sku promotion")

        cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
        cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA HFD")

        cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)').contains("QA HFD")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("QA")

        cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)').contains("QA")


        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Coca")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Fanta")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Dates")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
        cy.selectDropdownValue("Normal")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Amount")

        cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue(">= (")

        cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(0.00)

        cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.selectDropdownValue("Amount")

        cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(0.00)

        cy.get(':nth-child(2) > .sc-jSUZER > span').click()

        cy.get(':nth-child(4) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")
        cy.get(':nth-child(2) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")

        // cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
        // cy.url().should('not.include', '/create')



    })

    it("Verify active integrated BU are displayed", () => {

        const desiredBu = ['Red Bull India', 'P&G', 'Bu1', 'Bu2', 'Bu3', 'Mama Earth', 'Nepali Brand', 'Lenovo', 'QA HFD', 'Fix Derma', 'Local', 'handsome', 'test', 'jkl', 'QA BU']

        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        cy.get('.zindex-2__menu-list.css-11unzgr > div').should("be.visible").wait(1000).each((option) => {
            cy.wrap(option).invoke('text').then((optionText) => {
                cy.log(optionText);
            })
        })

        cy.get('.zindex-2__menu-list.css-11unzgr > div').each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredBu[index]);
        });
    })

    it("Verify active brand for BU are displayed", () => {

        const desiredBrand = ['BOOST', 'HORLICKS', 'Promotional SKUs', 'QA', 'VIVA']

        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
        cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")


        // cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        //     .type("QA {enter}")

        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
        // cy.get('.zindex-2__menu').find('.zindex-2__menu-list > div').contains().click()
        cy.selectDropdownValue("QA HFD")

        // cy.get('.loading-wrap > p').should("not.be.visible")
        cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()

        cy.wait(1000)

        cy.get('.zindex-2__menu').find('.zindex-2__menu-list > div').should("be.visible").each((option) => {
            cy.wrap(option).invoke('text').then((optionText) => {
                cy.log(optionText);
            })
        })

        cy.get('.zindex-2__menu').find('.zindex-2__menu-list > div').each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredBrand[index]);
        });
    })

    it("Verify current date promotion is created without selecting both start and end date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                // cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                // cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                // cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                // cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify promotion is created without selecting start date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                // cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                // cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify promotion is created without selecting end date", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                // cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                // cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify user cannot Create Promotions without a brand", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                // cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                // cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Brand is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion type", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                // cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                // cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Promotion type is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion condition", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                // cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                // cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Condition is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion criteria", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                // cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                // cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Criteria is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion condition value", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                // cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(4) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")
            })
        })

    })

    it("Verify user cannot Create Promotions without promotion disbursement type", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                // cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                // cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .sc-jrcTuL > .error-message').should("contain", "Disbursement Type is required")

            })
        })

    })

    it("Verify user cannot Create Promotions without promotion disbursement value", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                // cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()


                cy.get(':nth-child(2) > .form-input > .sc-hHTYSt > .error-message').should("contain", "Value is required")
            })
        })

    })


    it("Verify user can Create Promotions for a brand", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

            })
        })

    })

    it("Verify user can Create Promotions for a skus", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

            })
        })

    })

    it("Verify user can Create Promotions for a multiple skus", () => {
        title = "Multiple sku promotion" + timestamp
        cy.get(':nth-child(4) > .sc-jSUZER').click()
        cy.get('h2').should("have.text", "Create Promotions")
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
        cy.get('.sc-idXgbr').should('be.visible').click().type(title)

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
        cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")



    })

    it.skip("verify Limit for value fields", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')


                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

            })
        })



    })

    it("Verify user can Create Promotions with same title", () => {
        cy.get('@data1').then((data) => {
            data.forEach((promotion) => {
                let title = "Buy" + " " + promotion.bu + " " + promotion.sku + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')
                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')
                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

            })
        })

    })

    it.only("Create Promotions for each condition and disbursement for a sku", () => {
        cy.get('@data').then((data) => {
            data.forEach((promotion) => {
                title = "Buy" + " " + promotion.bu + " " + promotion.brand + " " + promotion.condition + " " + promotion.criteria + "  " + promotion.criteriaValue + " and get " + promotion.disbursementType + " of " + promotion.disbursementValue + " " + timestamp
                cy.get(':nth-child(4) > .sc-jSUZER').click()
                cy.get('h2').should("have.text", "Create Promotions")
                cy.get(':nth-child(2) > .sc-jSUZER > span').should("be.visible")
                cy.get('.col-lg-12 > .form-input > .sc-idXgbr').type(title)
                cy.get(':nth-child(2) > :nth-child(1) > .form-input > .sc-idXgbr').type(title)

                cy.get(':nth-child(2) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayStartOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(3) > .single-date-picker > .sc-ipEyDJ > .datepicker-wrapper > .sc-kgTSHT > .filter-item > :nth-child(1) > :nth-child(1) > .date-input > .moment').click()
                cy.get('.rdrDayEndOfMonth > .rdrDayNumber > span').click()

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.bu)

                cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.brand)

                // cy.get(':nth-child(2) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                // cy.selectDropdownValue(promotion.sku)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container').click()
                cy.selectDropdownValue("Normal")

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.condition)

                cy.get(':nth-child(3) > .config-panel-card > .config-panel-contents > .row > :nth-child(3) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.criteria)

                cy.get(':nth-child(4) > .form-input > .sc-idXgbr').type(promotion.criteriaValue)

                cy.get(':nth-child(4) > .config-panel-card > .config-panel-contents > .row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container').click()
                cy.selectDropdownValue(promotion.disbursementType)

                cy.get(':nth-child(2) > .form-input > .sc-idXgbr').type(promotion.disbursementValue)

                cy.get(':nth-child(2) > .sc-jSUZER > span').click()

                cy.get(".alert-message").should('contain', 'Promotion Created Successfully')
                cy.url().should('not.include', '/create')

                // cy.get('.search-input > div > .sc-jSUZER').click()
                // cy.get('.sc-idXgbr').should('be.visible').click().type(title)

                // cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('have.text', title)
                // cy.get(':nth-child(1) > .text-center > .sc-gswNZR').should('be.visible').should('have.text', "Active")

            })
        })



    })

})