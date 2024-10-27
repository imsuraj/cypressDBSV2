import { ENDPOINTS } from "../utils/endpoint";

// support/api/requests/auth.requests.js
export const authRequests = {
  login(username, password) {
    return cy.request({
      method: "POST",
      url: Cypress.env("apiUrl") + ENDPOINTS.AUTH.LOGIN,
      body: { username, password },
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    });
  },
};
