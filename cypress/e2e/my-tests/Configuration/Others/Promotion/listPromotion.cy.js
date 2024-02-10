const currentDate = new Date();
const timestamp = currentDate.getTime();
let beforeDelete
let afterDelete
let txt


describe("Create Promotion Test", () => {


    beforeEach(() => {
        cy.fixture('promotionSearch').as('data'); // Load the fixture data

        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.url().should('include', '/dashboard')
        cy.get(':nth-child(1) > :nth-child(10) > :nth-child(1)').should("be.visible").trigger('mouseover')
        cy.get(":nth-child(1) > :nth-child(10) > ul > :nth-child(4)").should("be.visible").trigger('mouseover')
        cy.get("a[href='/configuration/others/promotion']").click()
        cy.get('h2').should("have.text", "Promotions")
        cy.get('h2').click({force:true})


    })

    it.only("Verify table header of promotion list page", () => {

        cy.get('.checkbox > .sc-iBYQkv > label > .control-label').should("be.visible")
        cy.get('th:nth-child(2) div:nth-child(1)').should("be.visible").should("have.text", "ID")
        cy.get('th:nth-child(3) div:nth-child(1)').should("be.visible").should("have.text", "Promotion Title")
        cy.get('th:nth-child(4) div:nth-child(1)').should("be.visible").should("have.text", "Promotion Type")
        cy.get('th:nth-child(5) div:nth-child(1)').should("be.visible").should("have.text", "Start Date")
        cy.get('th:nth-child(6) div:nth-child(1)').should("be.visible").should("have.text", "End Date")
        cy.get('th:nth-child(7) div:nth-child(1)').should("be.visible").should("have.text", "Status")


        cy.get('.search-input > div > .sc-jSUZER').should("be.visible")
        cy.get('.datepicker-content').should("be.visible")
        cy.get('.filter-icon > .sc-jSUZER').should("be.visible")
        cy.get(':nth-child(4) > .sc-jSUZER').should("be.visible")

        



    })

    it("search promotion using title", () => {

        const promotionTitle = "QA";
        cy.get('.search-input > div > .sc-jSUZER').click()
        cy.get('.sc-idXgbr').should('be.visible').click().type(promotionTitle)

        cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('contain', promotionTitle)

    })

    it("should display default list after clearing search", () => {

        cy.get('@data').then((data) => {
            data.forEach((promotion) => {


                cy.get('.search-input > div > .sc-jSUZER').click()
                cy.get('.sc-idXgbr').should('be.visible').click().type(promotion.promotionTitle)

                cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').should('contain', promotion.promotionTitle)
                cy.get(':nth-child(2) > .sc-jSUZER').should('be.visible').click()
                cy.get('.sc-idXgbr').should('not.exist')

            })
        })

    })


    it("Active BU are displayed", () => {
        const desiredBu = ['HFD','Patanjali','ON-DEMAND','UPAYA TRANSPORT','sandeshTester','Red Bull India','P&G','Real Juice','Britania','Parle G','Ethiglow','Amazon','Bu1','Business ALias','a','Procter & Gamble','For stock ','Bu2','Bu3','Test','Mama Earth','Nepali Brand','Lenovo','QA HFD','Fix Derma','Moto','test-unit','test1','BU-test','k','Valuation SKU','OB Test','OBTest','Keshav','Segment3','MERO UPAYA','UPAYA FULFILLMENT','Upaya Connect','Local','Apple','Nepali Perfume','Masala Brand','handsome','test','jkl','QA','Kelloggs']
        cy.get('.filter-icon > .sc-jSUZER').should("be.visible").click()
        cy.get("div[class='filter-btn add'] span[class='sc-eDvSVe Dpiax']").click()
        cy.get(".filter-select__value-container.css-1d8n9bt").should('be.visible').click()
        cy.selectDropdownValueForFilter("Business Unit")

        cy.get(".filter-contain-group.custom-scroll").should("be.visible")

        cy.get('.filter-contain-group.custom-scroll > div').should("be.visible").wait(1000).each((option) => {
            cy.wrap(option).invoke('text').then((optionText) => {
                cy.log(optionText);
            })
        })

        cy.get('.filter-contain-group.custom-scroll > div').each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredBu[index]);
        });

    })


    it("Active Brands are displayed", () => {
        const desiredBu = [ " BU3","50-50","Apple","Apple","Apple","Apple","Apple","Apple Microfiber","Ariel","BOOST","Bourbon","Brand","Brand-cat","Bravo","Bu2","Cake","Collin","Digestive","Gillette","Good Day","HORLICKS","Head & Shoulders","Head & Shoulders","Herbal Essence","Inhaler","Island","Juice","Kellogg's All Bran","Kellogg's Chocos","Kellogg's K Pak","Kellogg's Muesli","Kellogg's Oats","Keshav","Latest Brand","Lenovo","Little Hearts","Local","Marie Gold","Milk Bikis","Milk Rusk","Miscellaneous","Mixed Juice","Moto","Nepali","New Brand","Nutrichoice","Nutro","OBtest","OLD SPICE","Olay","Old Spice","Oral B","Others","Packet","Pampers","Pantene","Pantene","Parle","Promotional SKUs","QA","QA","QA Brand","QA Brand","Red Bull","Rolls","Skin Care","Suji Toast","Test","Tide","Tiger","Treat","VIVA","Vicks","Vicks","Wheat Rusk","Whisper","bu1","check","nepali","popo","sdf","test-brand"]
        cy.get('.filter-icon > .sc-jSUZER').should("be.visible").click()
        cy.get("div[class='filter-btn add'] span[class='sc-eDvSVe Dpiax']").click()
        cy.get(".filter-select__value-container.css-1d8n9bt").should('be.visible').click()
        cy.selectDropdownValueForFilter("Brand")

        cy.get(".filter-contain-group.custom-scroll").should("be.visible")

        cy.get('.filter-contain-group.custom-scroll > div').should("be.visible").wait(1000).each((option) => {
            cy.wrap(option).invoke('text').then((optionText) => {
                cy.log(optionText);
            })
        })

        cy.get('.filter-contain-group.custom-scroll > div').each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredBu[index]);
        });



    })









})