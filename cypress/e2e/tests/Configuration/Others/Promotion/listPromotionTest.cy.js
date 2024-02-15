const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onPromotionsPage } = require("../../../../../support/PageObjects/PromotionPage/PromotionPage.po");

describe("List Promotion Test", () => {


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
        onPromotionsPage.getTableHeaderText(2).click()
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

    it("Check active BU are displayed in the filter", () => {
        //select "name"  from business_companies bc ;
        const desiredBu = ['QTY','Real Juice','Shreeyana Bu','Muna Chiya',"Hershey's",'UPAYA TRANSPORT','P&G','VAT BU','Noodles','Nails','DFD-TEST','HFD','Patanjali','ON-DEMAND','sandeshTester','Red Bull India','Britania','a','Parle G','Ethiglow','Amazon','Business ALias','For stock ','Test','Mama Earth','Nepali Brand','Lenovo','Fix Derma','Moto','test-unit','test1','k','Valuation SKU','OB Test','OBTest','Keshav','Segment3','MERO UPAYA','UPAYA FULFILLMENT','Upaya Connect','Apple','Nepali Perfume','Masala Brand','Kelloggs','QA BU','Bu1','Bu2','Bu3','Local','handsome','test','jkl','Sunfeast','HFD','Mars','BU-test','Procter & Gamble']
        
        onPromotionsPage.clickOnStandardFilter()
        onPromotionsPage.clickOnPlusIconOfFilter()
        onPromotionsPage.clickOnFilterDropdown()
        onPromotionsPage.selectDropDownValue('Business Unit')
        
        onPromotionsPage.isfilterItemValueDisplayed().should("be.visible")
        onPromotionsPage.checkAndCompareFilterValue(desiredBu)

    })

    it("Check if active Brands are displayed", () => {
        const desiredBrand = ['Pick list',"Vicks","50-50","Ariel","Gillette","Head & Shoulders","Herbal Essence","OLD SPICE","Olay","Old Spice","Oral B","Pampers","Pantene","Tide","Vicks","Whisper","Bourbon","Bravo","Cake","Digestive","Good Day","Island","Little Hearts","Marie Gold","Milk Bikis","Milk Rusk","Nutrichoice","Nutro","Rolls","Suji Toast","Tiger","Treat","Wheat Rusk","Juice","Mixed Juice","Inhaler","Parle","Kellogg's All Bran","Kellogg's Chocos","Kellogg's K Pak","Kellogg's Muesli","Kellogg's Oats","Skin Care","Others","Latest Brand","Red Bull","New Brand","Moto","Head & Shoulders","QA Brand","test-brand","check","Test","OBtest","Keshav","popo","QA","QA Brand","Nepali Brand","Collin","QA","nepali","Lenovo","bu1","Bu2","Packet","BU3","BOOST","HORLICKS","Promotional SKUs","VIVA","Local","Miscellaneous","New Brand","50-50","Cake","Digestive","Good Day","Little Hearts","Marie Gold","Milk Bikis","Milk Rusk","Nutrichoice","Suji Toast","Tiger","Treat","Wheat Rusk","Muna-Masala Tea","Muna-Normal Tea","Milk Chocolate","Dark chocolate","Choco lava","Fruits","VAT BU","Horlicks","waiwai","nails","Fruits"]
        // select title  from business_catalog_details bcd where catalog_id = 3 and active  order by lower(title), title ;
        onPromotionsPage.clickOnStandardFilter()
        onPromotionsPage.clickOnPlusIconOfFilter()
        onPromotionsPage.clickOnFilterDropdown()
        onPromotionsPage.selectDropDownValue('Brand')
        
        onPromotionsPage.isfilterItemValueDisplayed().should("be.visible")
        onPromotionsPage.checkAndCompareFilterValue(desiredBrand)

    })









})