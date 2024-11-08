const { ENDPOINTS } = require("../../support/api/utils/endpoint");
const {
  onLoginPage,
} = require("../../support/PageObjects/LoginPage/LoginPage.po");

describe("Mock API test", () => {
  const email = Cypress.env("username");
  const password = Cypress.env("password");

  before(() => {
    cy.intercept("POST", `**/${ENDPOINTS.SETTING.LIST}`).as("getSettings");
  });

  it("mocking test", () => {
    cy.login(email, password);
    cy.visit("/");

    cy.wait("@getSettings");
    cy.get("@getSettings").then((res) => {
      const settingData = res.response.body;
      console.log(settingData);
      cy.log(settingData.data.rows[0].currency_setting.value);
    });
  });
});
