// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { authRequests } from './api/requests/auth.requests';
import { ENDPOINTS } from './api/utils/endpoint';
import CreatePurchaseInvoicePage from './PageObjects/PurchaseInvoicePage/CreatePurchaseInvoice.po';

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openLoginPage', () => {
  cy.visit('/');
  // cy.visit(Cypress.env("baseUrl"))
});

// Cypress.Commands.add('login', (email, password) => {

//     cy.visit(Cypress.env('baseUrl'))
//     cy.get("input[placeholder='Email']").type(email)
//     cy.get("input[placeholder='Password']").type(password)
//     cy.get('button').click()
//     cy.wait(2000)
// })

Cypress.Commands.add('login', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/');
      cy.get("input[placeholder='Email']").type(email);
      cy.get("input[placeholder='Password']").type(password);
      cy.get('button').click();
      cy.wait(8000);
      cy.url().should('include', '/dashboard');
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add('loginApi', (email, password) => {
  const userCredentials = {
    username: email,
    password: password,
  };

  cy.session(
    [email, password],
    () => {
      cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + ENDPOINTS.AUTH.LOGIN,
        body: userCredentials,
        headers: {
          'Content-Type': 'application/json',
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response.body.data.access_token);
        window.localStorage.setItem(
          'access_token',
          response.body.data.access_token
        );
      });
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add('searchByText', (text) => {
  cy.get('.search-input > div > .sc-jSUZER')
    .should('be.visible')
    .click({ force: true });
  cy.get('#searchId')
    .should('be.visible')
    .type(text + '{enter}', { force: true });
  cy.wait(1000);
});

Cypress.Commands.add('getHeaderText', (alias) => {
  cy.get('h2')
    .invoke('text')
    .then((headerText) => {
      cy.wrap(headerText).as(alias);
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add('selectDropdownValue', (value) => {
  cy.get('.zindex-2__menu')
    .find('.zindex-2__menu-list > div')
    .contains(value)
    .click();
});

Cypress.Commands.add('compareTwoArrayValue', (locator, expectedValue) => {
  cy.get(locator).then(($listItems) => {
    // Extract text content from the list elements
    const actualValue = $listItems
      .map((index, element) => Cypress.$(element).text().trim())
      .get();

    const expectedValueWithoutSpace = expectedValue.map((value) =>
      value.trim()
    );
    const sortedExpecteValue = expectedValueWithoutSpace
      .slice()
      .sort((a, b) => a.localeCompare(b));
    const sortedActualValue = actualValue
      .slice()
      .sort((a, b) => a.localeCompare(b));

    if (sortedExpecteValue.length == sortedActualValue.length) {
      cy.log('SortedActualValue ' + sortedActualValue);
      cy.log('SortedExpectedValue ' + sortedExpecteValue);
      expect(sortedActualValue).to.deep.equal(sortedExpecteValue);
      // cy.wrap(sortedExpecteValue).should('deep.equal',sortedActualValue)
    } else {
      cy.log('Arrays are not equal');
      cy.log('SortedActualValue ' + sortedActualValue);
      cy.log('SortedExpectedValue ' + sortedExpecteValue);
    }
  });
});

/**
 * Trim text and assign it to the alias
 */

Cypress.Commands.add('getTextAndAlias', (labelText, aliasName) => {
  return cy
    .get('.total-section') // Start by getting all sections
    .filter((_, section) => {
      // Filter sections based on label text
      return Cypress.$(section).find('.title').text().trim() === labelText;
    })
    .find('.calculated-value') // Find the value in the matched section
    .invoke('text') // Get the text of the calculated value
    .then((text) => {
      cy.wrap(text.trim()).as(aliasName); //
    });
});

Cypress.Commands.add('selectDropdownValueForFilter', (value) => {
  cy.get('.filter-select__menu')
    .find('.filter-select__menu-list > div')
    .contains(value)
    .click();
});

Cypress.Commands.add('selectDateFromCalendar', (value) => {
  cy.get('.rdrDays')
    .find(
      'button.rdrDay:not(.rdrDayPassive):not(.rdrDayDisabled)>span.rdrDayNumber>span'
    )
    .contains(value)
    .click();
});

Cypress.Commands.add('getTextAndStore', (selector, variableName) => {
  cy.get(selector)
    .invoke('text')
    .then((text) => {
      cy.wrap(text).as(variableName);
    });
});

Cypress.Commands.add(
  'addSKUforPRN',
  (
    skuTitle,
    batchName,
    sellable,
    damages,
    shortages,
    rate,
    excise,
    lineDisc
  ) => {
    cy.get(
      'tr > :nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container'
    )
      .click()
      .type(skuTitle + '{enter}');

    cy.get('tr > :nth-child(3) > .sc-ftTHYK > .form-select-input')
      .click()
      .type(batchName + '{enter}');

    cy.get('tr > :nth-child(6) > .form-input > .sc-idXgbr')
      .click()
      .clear()
      .type(sellable);

    cy.get('tr > :nth-child(7) > .form-input > .sc-idXgbr')
      .click()
      .clear()
      .type(damages);

    cy.get('tr > :nth-child(8) > .form-input > .sc-idXgbr')
      .click()
      .clear()
      .type(shortages);

    cy.get('tr > :nth-child(11) > .form-input > .sc-idXgbr')
      .click()
      .clear()
      .type(rate);

    //Add bill terms
    // cy.get('.td-discount > .sc-jSUZER').click()

    // cy.get('.evolve-dialog__header > div > h2').should('be.visible')

    // cy.get(':nth-child(1) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr')
    // .click().clear().type(excise)

    // cy.get(':nth-child(2) > :nth-child(2) > .type-section > .form-input > .sc-idXgbr')
    // .click().clear().type(lineDisc)

    // cy.get('.dSdSlu').click()
  }
);

// Define a reusable command to intercept API calls and validate their status code
Cypress.Commands.add(
  'validateAPICalls',
  (apiEndpoints, expectedResponseCode) => {
    // Iterate over each API endpoint and create intercepts
    apiEndpoints.forEach((api) => {
      cy.intercept(`api/**`).as(api);
    });

    // Wait for each API call and assert the status code
    apiEndpoints.forEach((api) => {
      cy.wait(`@${api}`)
        .its('response.statusCode')
        .should('be.oneOf', expectedResponseCode);
    });
  }
);

Cypress.Commands.add('loginViaApi', (username, password) => {
  cy.log('Login via api');
  return authRequests.login(username, password).then((response) => {
    if (response.status === 200) {
      Cypress.env('authToken', response.body.data.access_token);
    }
    return response;
  });
});

// // Helper function to parse currency strings
// Cypress.Commands.add("parseCurrency", (value) => {
//   return parseFloat(value.replace(/,/g, ""));
// });

// // Format function, if not already defined
// Cypress.Commands.add("formatToTwoDecimalPlaces", (value) => {
//   return parseFloat(value).toFixed(2);
// });

Cypress.Commands.add('selectRowValueOnPage', (value) => {
  cy.get('.custom-select-option').click({ force: true });
  cy.get('.custom-options-list-bottom li').contains(value).click();
});

Cypress.Commands.add('checkLoadingIconIsNotDisplayed', (value) => {
  cy.get('[class="loading-wrap"]').should('not.be.visible');
});

// Custom command to check if a specific value is displayed in the custom select option
Cypress.Commands.add('checkValueDisplayed', (value) => {
  cy.get('.custom-select-option') // Target the div containing the value
    .should('be.visible') // Ensure the element is visible
    .within(() => {
      cy.contains(value) // Check if the specified value is displayed
        .should('be.visible'); // Confirm it is visible
    });
});

Cypress.Commands.add('clickAddBillTerms', () => {
  cy.get('.td-discount > .sc-jSUZER').click();
});
Cypress.Commands.add('isBillTernHeaderTextDisplayed', () => {
  return cy.get('.evolve-dialog__header > div > h2').should('be.visible');
});
Cypress.Commands.add('enterFirstBillTermValue', (value) => {
  cy.get(':nth-child(1) > :nth-child(2) > .type-section > .form-input > #input')
    .clear()
    .type(value)
    .should('have.prop', 'valueAsNumber', value);
});
Cypress.Commands.add('enterSecondBillTermValue', (value) => {
  cy.get(':nth-child(2) > :nth-child(2) > .type-section > .form-input > #input')
    .clear()
    .type(value)
    .should('have.prop', 'valueAsNumber', value);
});
Cypress.Commands.add('clickAddDiscountBtn', () => {
  cy.get('.dSdSlu').click({ force: true });
});
Cypress.Commands.add('clickAddSKUBtn', () => {
  cy.get("button[class='sc-jSUZER jKQpJu primary small '] span")
    .contains('Add')
    .click();
});
Cypress.Commands.add('clickAddNewLineBtn', () => {
  cy.get('.add-btn').click();
});

Cypress.Commands.add('clickOnCreateIcon', () => {
  cy.get("svg[class$='icon plus']").click({ force: true });
});
