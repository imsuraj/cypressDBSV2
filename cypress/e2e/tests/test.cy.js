const { onDashboardPage } = require("../../support/PageObjects/DashboardPage/DashboardPage.po");
const { onCreatePromotionPage } = require("../../support/PageObjects/PromotionPage/CreatePromotionPage.po");
const { onPromotionsPage } = require("../../support/PageObjects/PromotionPage/PromotionPage.po");

describe("daf", () => {

  beforeEach('sdf', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.wait(2000)
    
  })

  it('gets current date and timestamp', () => {
    // Get the current date
    const currentDate = new Date();

    // Get the current timestamp (milliseconds since January 1, 1970)
    const timestamp = currentDate.getTime();

    // Log the current date and timestamp
    cy.log('Current Date:', currentDate.toDateString());
    cy.log('Timestamp:', timestamp);
  });



  it("dsf", () => {

    const bill = "1,234,567.89"
    const trade = "1,234,567.89"
    const billWithoutCommas = bill.replace(/,/g, "");
    const tradeWithoutCommas = bill.replace(/,/g, "");

    // expect(amountWithoutCommas).to.equal("1234567.89");
    cy.log(billWithoutCommas)
    cy.log(tradeWithoutCommas)

    cy.log(billWithoutCommas + tradeWithoutCommas)
  })




  it('should sort an array of strings in alphabetical order', () => {
    // Your array of strings (replace with your actual array)
    const unsortedArray = ['Banana', 'Apple', 'Orange', 'Grapes'];

    // Sort the array in alphabetical order
    const sortedArray = unsortedArray.slice().sort();

    // Log the original and sorted arrays
    cy.log('Original Array:', unsortedArray);
    cy.log('Sorted Array:', sortedArray);

    // Example: Perform assertions based on the sorted array
    // expect(sortedArray).to.deep.equal(['Apple', 'Banana', 'Grapes', 'Orange']);

    // Example: Perform actions based on each string in the sorted array
    // sortedArray.forEach((str) => {
    //   // Perform actions based on each string
    //   // For example, cy.log(str), cy.contains(str).click(), etc.
    // });
  });


  it.only("Verify mandatory message is displayed", () => {
    cy.visit('/')

    onDashboardPage.hoverMouseOverConfiguration()
    onDashboardPage.hoverMouseOverOther()
    onDashboardPage.openPromotion()

    onPromotionsPage.clickCreateIcon()
    onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
    onCreatePromotionPage.clickSaveBtn()

    onCreatePromotionPage.getTitleErrorMessage().should("contain", "Promotion title is required")
    onCreatePromotionPage.getBUErrorMessage().should("contain", "Business unit is required")
    onCreatePromotionPage.getBrandErrorMessage().should("contain", "Brand is required")
    onCreatePromotionPage.getPromotionTypeErrorMessage().should("contain", "Promotion type is required")
    onCreatePromotionPage.getPromotionConditionErrorMessage().should("contain", "Condition is required")
    onCreatePromotionPage.getPromotionCriteriaErrorMessage().should("contain", "Criteria is required")
    onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")

    onCreatePromotionPage.getPromotionDisbursementTypeErrorMessage().should("contain", "Disbursement type is required")
    onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")

})


it.only("Verify mandatory message is displayed when user creates promotion with non required fields", () => {

  cy.visit('/')

  onDashboardPage.hoverMouseOverConfiguration()
  onDashboardPage.hoverMouseOverOther()
  onDashboardPage.openPromotion()

  onPromotionsPage.clickCreateIcon()

  onCreatePromotionPage.getHeaderText().should("have.text", "Create Promotions")
  onCreatePromotionPage.enterPromotionDescription("ABC")
  onCreatePromotionPage.clickSaveBtn()


  onCreatePromotionPage.getTitleErrorMessage().should("contain", "Promotion title is required")
  onCreatePromotionPage.getBUErrorMessage().should("contain", "Business unit is required")
  onCreatePromotionPage.getBrandErrorMessage().should("contain", "Brand is required")
  onCreatePromotionPage.getPromotionTypeErrorMessage().should("contain", "Promotion type is required")
  onCreatePromotionPage.getPromotionConditionErrorMessage().should("contain", "Condition is required")
  onCreatePromotionPage.getPromotionCriteriaErrorMessage().should("contain", "Criteria is required")
  onCreatePromotionPage.getPromotionConditionValErrorMessage().should("contain", "Value is required")

  onCreatePromotionPage.getPromotionDisbursementTypeErrorMessage().should("contain", "Disbursement type is required")
  onCreatePromotionPage.getPromotionDisbursementValErrorMessage().should("contain", "Value is required")

})




  it.skip('sdf',() => {

    const userCredentials = {
      "username": Cypress.env("username"),
      "password": Cypress.env("password")
  }


    cy.request('POST', Cypress.env("baseUrl")+'/api/v1/auth/login', userCredentials)
    .its('body').then(body => {
      const token = body.data.access_token
      cy.log(token)
    })
  })

})





