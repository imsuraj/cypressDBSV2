const { authRequests } = require("../../support/api/requests/auth.requests");
const {
  branchRequests,
  branchRequestsWithoutToken,
  branchRequestsWithInvalidToken,
} = require("../../support/api/requests/branch.requests");
const {
  companyRequest,
  companyRequests,
  companyRequestsWithoutToken,
  companyRequestsWithInvalidToken,
} = require("../../support/api/requests/company.requests");
const { MESSAGE } = require("../../support/api/utils/message");

describe("API tests", () => {
  const email = Cypress.env("username");
  const password = Cypress.env("password");

  // Check that required environment variables are set
  before(() => {
    if (!email || !password || !Cypress.env("apiUrl")) {
      throw new Error(
        "Environment variables 'username', 'password' are missing."
      );
    }
  });

  describe("Login api tests", () => {
    it("should login successfully with valid credentials", () => {
      cy.log(`Attempting login with email: ${email}`);

      authRequests.login(email, password).then((response) => {
        expect(response.status).to.eq(200);
        //   console.log(JSON.stringify(response));
        expect(response.body.data.user).to.have.property("email", `${email}`);
        expect(response.body).to.have.property("status", MESSAGE.AUTH.STATUS);
      });
    });

    it("should fail to login with invalid credentials", () => {
      authRequests
        .login("invalid_email@example.com", "wrongpassword")
        .then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.have.property("status", "error");
          expect(response.body.errors[0]).to.have.property(
            "message",
            MESSAGE.AUTH.INVALID_CREDENTIALS
          );
        });
    });
    it("should return 400 when missing required fields", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("apiUrl") + "/api/v1/auth/login",
        body: {},
        failOnStatusCode: false, // Prevent test from failing on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.errors[0]).to.have.property(
          "message",
          MESSAGE.AUTH.SOMETHING_WENT_WRONG
        );
      });
    });
  });

  describe("Company API Tests", () => {
    before(() => {
      cy.loginViaApi(Cypress.env("username"), Cypress.env("password"));
    });
    it("should fetch company data with valid token", () => {
      companyRequests().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property(
          "status",
          MESSAGE.COMPANY.STATUS
        );
      });
    });

    it("should return 401 when fetching company data without token", () => {
      companyRequestsWithoutToken().then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.errors[0]).to.have.property(
          "message",
          MESSAGE.COMPANY.UNAUTHORIZED_ACCESS
        );
      });
    });

    it("should return 401 for expired token", () => {
      companyRequestsWithInvalidToken().then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.errors[0]).to.have.property(
          "message",
          "Unauthorized Access!"
        );
      });
    });
  });

  describe("Branch List API Tests", () => {
    before(() => {
      cy.loginViaApi(Cypress.env("username"), Cypress.env("password"));
    });
    it("should fetch branch list with valid token", () => {
      branchRequests().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("status", MESSAGE.BRANCH.STATUS);
      });
    });

    it("should return 401 when accessing branch list without token", () => {
      branchRequestsWithoutToken().then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.errors[0]).to.have.property(
          "message",
          MESSAGE.BRANCH.UNAUTHORIZED_ACCESS
        );
      });
    });

    it("should return 401 for expired token when accessing branch list", () => {
      branchRequestsWithInvalidToken().then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.errors[0]).to.have.property(
          "message",
          MESSAGE.BRANCH.UNAUTHORIZED_ACCESS
        );
      });
    });
  });
});
