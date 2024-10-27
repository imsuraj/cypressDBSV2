const { authRequests } = require("../../support/api/requests/auth.requests");
const {
  branchRequests,
} = require("../../support/api/requests/branch.requests");
const {
  companyRequests,
} = require("../../support/api/requests/company.requests");

describe("Login Flow", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  context("Complete Login Flow", () => {
    it("should complete full login flow with subsequent API calls", () => {
      // Step 1: Login
      authRequests.login(username, password).then((loginResponse) => {
        // Verify login success
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body.data.user).to.have.property(
          "email",
          username
        );

        // Store token
        const authToken = loginResponse.body.data.access_token;
        Cypress.env("authToken", authToken);

        // validate company api
        companyRequests().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("status", "success");
        });

        // validate company api
        branchRequests().then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("status", "success");
        });
      });
    });
  });
});
