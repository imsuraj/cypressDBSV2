const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onPromotionsPage } = require("../../../../../support/PageObjects/PromotionPage/PromotionPage.po");

describe("Create Promotion Test", () => {


    beforeEach(() => {
        cy.fixture('promotions').as('data'); // Load the fixture data
        cy.fixture('promotionsSKU').as('data1'); // Load the fixture data
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.wait(2000)
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

    it("Verify table header of promotion list page", () => {
        onPromotionsPage.getTableHeaderText(0).should('have.attr','class','checkbox')
        onPromotionsPage.getTableHeaderText(1).should("have.text", "ID")
        onPromotionsPage.getTableHeaderText(2).should("have.text", "Promotion Title")
        onPromotionsPage.getTableHeaderText(3).should("have.text", "Promotion Type")
        onPromotionsPage.getTableHeaderText(4).should("have.text", "Start Date")
        onPromotionsPage.getTableHeaderText(5).should("have.text", "End Date")
        onPromotionsPage.getTableHeaderText(6).should("have.text", "Status")
        onPromotionsPage.getTableHeaderText(7).find('span').should('have.attr', 'class', 'sorting-icon')

        onPromotionsPage.isSeachIconDisplayed().should("be.visible")
        onPromotionsPage.isDateFilteIconDisplayed().should("be.visible")
        onPromotionsPage.isStandartFilteIconDisplayed().should("be.visible")
        onPromotionsPage.isCreatIconDisplayed().should("be.visible")
    })

    it("search promotion using title", () => {

        const promotionTitle = "Buy";
        
        try {
            onPromotionsPage.searchPromotion(promotionTitle)
            onPromotionsPage.checkSearchedValueIsDisplayed(promotionTitle)
            onPromotionsPage.checkSearchedValueIsDisplayed("Active")
            
        } catch (error) {
            cy.log('Promotion with the given title '+promotionTitle+' does not seem to be created yet')
        }
      

    })

    it("should display default list after clearing search", () => {
        cy.get('@data').then((data) => {
            data.forEach((promotion) => {
                onPromotionsPage.searchPromotion(promotion.brand)
                onPromotionsPage.checkSearchedValueIsDisplayed(promotion.brand)
                onPromotionsPage.clickOnSearchIcon()
                onPromotionsPage.isSeachBoxDisplayed().should('not.exist')
            })
        })
    })


    it.skip("Active BU are displayed in the filter", () => {
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

    it.skip("Active Brands are displayed", () => {
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

    it.only("Active BU are displayed in the filter", () => {
        const desiredBu = ['HFD','Patanjali','ON-DEMAND','UPAYA TRANSPORT','sandeshTester','Red Bull India','P&G','Real Juice','Britania','Parle G','Ethiglow','Amazon','Bu1','Business ALias','a','Procter & Gamble','For stock ','Bu2','Bu3','Test','Mama Earth','Nepali Brand','Lenovo','QA HFD','Fix Derma','Moto','test-unit','test1','BU-test','k','Valuation SKU','OB Test','OBTest','Keshav','Segment3','MERO UPAYA','UPAYA FULFILLMENT','Upaya Connect','Local','Apple','Nepali Perfume','Masala Brand','handsome','test','jkl','QA','Kelloggs']
        
        onPromotionsPage.clickOnStandardFilter()
        onPromotionsPage.clickOnPlusIconOfFilter()
        onPromotionsPage.clickOnFilterDropdown()
        onPromotionsPage.selectDropDownValue('Business Unit')
        
        onPromotionsPage.isfilterItemValueDisplayed().should("be.visible")

        onPromotionsPage.getFilterItemValue('itemValue')

        cy.get('@itemValue').then(itemValue => {
            cy.log(itemValue)
        })

        onPromotionsPage.testArray()

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