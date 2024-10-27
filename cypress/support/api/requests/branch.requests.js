import { ENDPOINTS } from "../utils/endpoint";

export const branchRequests = () => {
  return cy.request({
    method: "POST",
    url: Cypress.env("apiUrl") + ENDPOINTS.BRANCH.LIST,
    headers: {
      Authorization: `Bearer ${Cypress.env("authToken")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
};

export const branchRequestsWithoutToken = () => {
  return cy.request({
    method: "POST",
    url: Cypress.env("apiUrl") + ENDPOINTS.BRANCH.LIST,
    headers: {
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
};

export const branchRequestsWithInvalidToken = () => {
  return cy.request({
    method: "POST",
    url: Cypress.env("apiUrl") + ENDPOINTS.BRANCH.LIST,
    headers: {
      Authorization: `Bearer Invalid_token`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
};
