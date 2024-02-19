const { onBrandPage } = require("../../../../../support/PageObjects/CatalogsPage/BrandPage.po")
const { onDashboardPage } = require("../../../../../support/PageObjects/DashboardPage/DashboardPage.po")

describe('Brands Page tests', () => {

    beforeEach('Open App, Login and go to business unit page', () => {
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.visit('/')
        onDashboardPage.hoverMouseOverConfiguration();
        onDashboardPage.hoverMouseOverCatalog();
        onDashboardPage.openBrand()
    })


    it('verify searching value matched in each displayed row', () => {


        const brand = ['Pick list', "Vicks", "50-50", "Ariel", "Gillette", "Head & Shoulders", "Herbal Essence", "OLD SPICE", "Olay", "Old Spice", "Oral B", "Pampers", "Pantene", "Tide", "Vicks", "Whisper", "Bourbon", "Bravo", "Cake", "Digestive", "Good Day", "Island", "Little Hearts", "Marie Gold", "Milk Bikis", "Milk Rusk", "Nutrichoice", "Nutro", "Rolls", "Suji Toast", "Tiger", "Treat", "Wheat Rusk", "Juice", "Mixed Juice", "Inhaler", "Parle", "Kellogg's All Bran", "Kellogg's Chocos", "Kellogg's K Pak", "Kellogg's Muesli", "Kellogg's Oats", "Skin Care", "Others", "Latest Brand", "Red Bull", "New Brand", "Moto", "Head & Shoulders", "QA Brand", "test-brand", "check", "Test", "OBtest", "Keshav", "popo", "QA", "QA Brand", "Nepali Brand", "Collin", "QA", "nepali", "Lenovo", "bu1", "Bu2", "Packet", "BU3", "BOOST", "HORLICKS", "Promotional SKUs", "VIVA", "Local", "Miscellaneous", "New Brand", "50-50", "Cake", "Digestive", "Good Day", "Little Hearts", "Marie Gold", "Milk Bikis", "Milk Rusk", "Nutrichoice", "Suji Toast", "Tiger", "Treat", "Wheat Rusk", "Muna-Masala Tea", "Muna-Normal Tea", "Milk Chocolate", "Dark chocolate", "Choco lava", "Fruits", "VAT BU", "Horlicks", "waiwai", "nails", "Fruits"]
        onBrandPage.clickOnSearchIcon()
        // onBrandPage.enterValueInTheSearchBox('Apple')
        // onBrandPage.ClickOnEditAsPerValue('Apple')
        // onBrandPage.seachEachRow('Apple')
        onBrandPage.seachMultipleValueEachRow(brand)

    })

})