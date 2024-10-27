import { ENDPOINTS } from "../utils/endpoint";

export const companyRequests = () => {
  return cy.request({
    method: "GET",
    url: Cypress.env("apiUrl") + ENDPOINTS.COMPANY.FIND,
    headers: {
      Authorization: `Bearer ${Cypress.env("authToken")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
};

export const companyRequestsWithoutToken = () => {
  return cy.request({
    method: "POST",
    url: Cypress.env("apiUrl") + ENDPOINTS.BRANCH.LIST,
    headers: {
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
};

export const companyRequestsWithInvalidToken = () => {
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
