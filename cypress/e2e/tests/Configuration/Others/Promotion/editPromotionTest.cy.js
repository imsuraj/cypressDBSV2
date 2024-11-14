const {
  onDashboardPage,
} = require('../../../../../support/PageObjects/DashboardPage/DashboardPage.po');
const {
  onCreatePromotionPage,
} = require('../../../../../support/PageObjects/PromotionPage/CreatePromotionPage.po');
const {
  onEditPromotionPage,
} = require('../../../../../support/PageObjects/PromotionPage/EditPromotionPage.po');
const {
  onPromotionsPage,
} = require('../../../../../support/PageObjects/PromotionPage/PromotionPage.po');

function getTime() {
  let currentDate = new Date();
  let timestamp = currentDate.getTime();
  return timestamp;
}

describe('Edit Promotion Test', () => {
  beforeEach(() => {
    cy.fixture('promotions').as('data'); // Load the fixture data
    cy.fixture('promotionsSKU').as('data1'); // Load the fixture data
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.visit('/');
    cy.wait(2000);
    onDashboardPage.hoverMouseOverConfiguration();
    onDashboardPage.hoverMouseOverOther();
    onDashboardPage.openPromotion();

    cy.getHeaderText('headerText');
    cy.get('@headerText').then((headerText) => {
      try {
        expect(headerText).to.eq('Promotions');
      } catch (error) {
        cy.log('Header Text does not match');
      }
    });
  });

  it('Verify edit icon is displayed in promotion detail', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);

        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );

        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );

        onCreatePromotionPage.clickSaveBtn();

        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });

        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.openPromotionDetail(time);
        onEditPromotionPage.isEditIconDisplayed();
      });
    });
  });

  it('Verify user is redirected to list page after clicking cancel button', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);

        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );

        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );

        onCreatePromotionPage.clickSaveBtn();

        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });

        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.openPromotionDetail(time);
        onEditPromotionPage.isEditIconDisplayed();
        onEditPromotionPage.clickEditIcon();
        onCreatePromotionPage.clickCancelBtn();

        cy.url().should('include', '/configuration/others/promotion');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
      });
    });
  });

  it('Verify title is updated and new promotion is not created when user update title', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);

        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );

        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );

        onCreatePromotionPage.clickSaveBtn();

        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });

        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + time;
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);

          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);

          onPromotionsPage.openPromotionDetail(time);

          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.enterPromotionTitle(newPromotionTitle);
          onCreatePromotionPage.clickSaveBtn();

          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');

          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(newPromotionTitle);

          onPromotionsPage
            .getPromotionTitle()
            .should('be.visible')
            .should('have.text', newPromotionTitle);
          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId);
        });
      });
    });
  });

  it('Verify description is updated and new promotion is not created when user update description only', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);

        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );

        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );

        onCreatePromotionPage.clickSaveBtn();

        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });

        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);

          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);

          onPromotionsPage.openPromotionDetail(time);

          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.enterPromotionDescription(newPromotionTitle);
          onCreatePromotionPage.clickSaveBtn();

          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');

          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionTitle()
            .should('be.visible')
            .should('contain', time);
          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId);
        });
      });
    });
  });

  it('Verify description is updated and new promotion is not created when user updates both title and description', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');
        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + time;
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();
          onCreatePromotionPage.enterPromotionTitle(newPromotionTitle);
          onCreatePromotionPage.enterPromotionDescription(newPromotionTitle);
          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);
          onPromotionsPage
            .getPromotionTitle()
            .should('be.visible')
            .should('contain', newPromotionTitle);
          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId);
        });
      });
    });
  });

  it('Verify new promotion is created when user update start date of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;
        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnStartDateCalendar();
          onCreatePromotionPage.selectDateFromCalendar(4);

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
    // compare the two buttons' text
    // and make sure they are different
    // cy.get('button').should(($btn2) => {
    //   expect($btn2.text()).not.to.eq(txt)
    // })
  });

  it('Verify new promotion is created when user updates end date of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;
        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnEndDateCalendar();
          onCreatePromotionPage.selectDateFromCalendar(4);

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update BU and Brand of an existing promotion', () => {
    let newBU = 'QA BU';
    let newBrand = 'QA Brand';
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;
        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnDropdown('Business Unit');
          onCreatePromotionPage.selectBusinessUnitValue(newBU);
          onCreatePromotionPage.clickOnDropdown('Brand');
          onCreatePromotionPage.selectBrandValue(newBrand);

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update sku of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnDropdown('SKU');
          onCreatePromotionPage.selectSkuValue(
            'Sunfeast Good Day Nuts Cookie 200 gm x 20 NPR 100 NP [99380]'
          );

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          // onPromotionsPage.searchPromotion(newPromotionTitle)
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update promotion condition of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Business Unit')
          .should('contain', promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnDropdown('Condition');
          onCreatePromotionPage.selectPromotionConditionValue('Quantity');
          onCreatePromotionPage
            .getSelectedValueOfDropdown('Condition')
            .should('contain', 'Quantity');

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update promotion criteria of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Business Unit')
          .should('contain', promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Criteria')
          .should('contain', promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnDropdown('Criteria');
          onCreatePromotionPage.selectPromotionCriteriaValue('= EQUALS');
          onCreatePromotionPage
            .getSelectedValueOfDropdown('Criteria')
            .should('contain', '= EQUALS');

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update promotion condition value of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Business Unit')
          .should('contain', promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Criteria')
          .should('contain', promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.enterPromotionConditionValue('5');

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update Disbursement type of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Business Unit')
          .should('contain', promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Criteria')
          .should('contain', promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.clickOnDropdown('Disbursement Type');
          onCreatePromotionPage.selectPromotionDisbursement('Discount (%)');
          onCreatePromotionPage
            .getSelectedValueOfDropdown('Disbursement Type')
            .should('contain', 'Discount (%)');

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is created when user update Disbursement value of an existing promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();
        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);
        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();
        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Business Unit')
          .should('contain', promotion.bu);
        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);
        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);
        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');
        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );
        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);
        onCreatePromotionPage
          .getSelectedValueOfDropdown('Criteria')
          .should('contain', promotion.criteria);
        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );
        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );
        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );
        onCreatePromotionPage.clickSaveBtn();
        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });
        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          const newPromotionTitle = 'New Title' + getTime();
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);
          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);
          onPromotionsPage.openPromotionDetail(time);
          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onCreatePromotionPage.enterPromotionDisbursementValue('50');

          onCreatePromotionPage.clickSaveBtn();
          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');
          onPromotionsPage.checkSearchedValueIsDisplayed(time);

          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId + 1);
        });
      });
    });
  });

  it('Verify new promotion is not created when user update status of the promotion', () => {
    cy.get('@data1').then((data) => {
      data.forEach((promotion) => {
        let time = getTime();
        let title =
          'Buy' +
          ' ' +
          promotion.bu +
          ' ' +
          promotion.sku +
          ' ' +
          promotion.condition +
          ' ' +
          promotion.criteria +
          '  ' +
          promotion.criteriaValue +
          ' and get ' +
          promotion.disbursementType +
          ' of ' +
          promotion.disbursementValue +
          ' ' +
          time;

        onPromotionsPage.clickCreateIcon();
        onCreatePromotionPage
          .getHeaderText()
          .should('have.text', 'Create Promotions');
        onCreatePromotionPage.isSaveBtnDisplayed();

        onCreatePromotionPage.enterPromotionTitle(title);
        onCreatePromotionPage.enterPromotionDescription(title);

        onCreatePromotionPage.selectStartDate();
        onCreatePromotionPage.selectEndDate();

        onCreatePromotionPage.clickOnDropdown('Business Unit');
        onCreatePromotionPage.selectBusinessUnitValue(promotion.bu);

        onCreatePromotionPage.clickOnDropdown('Brand');
        onCreatePromotionPage.selectBrandValue(promotion.brand);

        onCreatePromotionPage.clickOnDropdown('SKU');
        onCreatePromotionPage.selectSkuValue(promotion.sku);

        onCreatePromotionPage.clickOnDropdown('Promotion Type');
        onCreatePromotionPage.selectPromotionTypeValue('Normal');

        onCreatePromotionPage.clickOnDropdown('Condition');
        onCreatePromotionPage.selectPromotionConditionValue(
          promotion.condition
        );

        onCreatePromotionPage.clickOnDropdown('Criteria');
        onCreatePromotionPage.selectPromotionCriteriaValue(promotion.criteria);

        onCreatePromotionPage.enterPromotionConditionValue(
          promotion.criteriaValue
        );

        onCreatePromotionPage.clickOnDropdown('Disbursement Type');
        onCreatePromotionPage.selectPromotionDisbursement(
          promotion.disbursementType
        );

        onCreatePromotionPage.enterPromotionDisbursementValue(
          promotion.disbursementValue
        );

        onCreatePromotionPage.clickSaveBtn();

        onCreatePromotionPage
          .getAlertMessage()
          .should('contain', 'Promotion Created Successfully');
        cy.url().should('not.include', '/create');
        cy.getHeaderText('headerText');
        cy.get('@headerText').then((headerText) => {
          try {
            expect(headerText).to.eq('Promotions');
          } catch (error) {
            cy.log('Header Text does not match');
          }
        });

        onPromotionsPage.searchPromotion(time);
        onPromotionsPage.checkSearchedValueIsDisplayed(time);
        onPromotionsPage.checkSearchedValueIsDisplayed('Active');

        onPromotionsPage.getPromotionId().then(($btn) => {
          // store the button's text
          let existingPromotionId = parseInt($btn.text(), 10);

          cy.log(existingPromotionId);
          cy.log(existingPromotionId + 2);

          onPromotionsPage.openPromotionDetail(time);

          cy.url().should('include', '/' + existingPromotionId);
          onEditPromotionPage.isEditIconDisplayed();
          onEditPromotionPage.clickEditIcon();

          onEditPromotionPage.isStatusDisplayed().should('be.visible');
          onEditPromotionPage.clickOnStatus();
          onCreatePromotionPage.clickSaveBtn();

          onCreatePromotionPage
            .getAlertMessage()
            .should('contain', 'Promotion Updated Successfully');
          cy.url().should('not.include', '/create');

          onPromotionsPage.checkSearchedValueIsDisplayed(time);
          onPromotionsPage.checkSearchedValueIsDisplayed('Inactive');

          onPromotionsPage
            .getPromotionTitle()
            .should('be.visible')
            .should('contain', time);
          onPromotionsPage
            .getPromotionId()
            .should('be.visible')
            .should('have.text', existingPromotionId);
        });
      });
    });
  });
});
