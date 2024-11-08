const {
  onDashboardPage,
} = require("../../../../support/PageObjects/DashboardPage/DashboardPage.po");
const {
  onUpdateSalesVatReport,
} = require("../../../../support/PageObjects/Reports/IRDReports/UpdagteSalesVatReportPage.po");

describe("Updated Sales Vat Report Test", () => {
  const invoiceNum = "DM-ABI/0000004/81-82";
  beforeEach("Login", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/");
    onDashboardPage.hoverMouseOverReports();
    onDashboardPage.hoverMouseOverIrdReports();
    onDashboardPage.openUpdatedSalesVatReport();
    cy.reload();
  });

  it("Verify Updated Sales Vat Report", () => {
    cy.getHeaderText("headerText");
    cy.get("@headerText").then((headerText) => {
      expect(headerText).to.eq("Updated Sales VAT Report");
    });

    onUpdateSalesVatReport.searchByInvoiceNumnber(invoiceNum);
    onUpdateSalesVatReport.getTotalSales(invoiceNum, "totalSales");
    onUpdateSalesVatReport.getTaxExempted(invoiceNum, "taxExempted");
    onUpdateSalesVatReport.getTaxableSales(invoiceNum, "taxableSales");
    onUpdateSalesVatReport.getVat(invoiceNum, "vat");
    cy.get("@totalSales").then((totalSales) => {
      cy.log(totalSales);

      cy.get("@taxExempted").then((taxExempted) => {
        cy.log(taxExempted);

        cy.get("@taxableSales").then((taxableSales) => {
          cy.log(taxableSales);

          cy.get("@vat").then((vat) => {
            cy.log(vat);
            const taxExemptedNum = formatToTwoDecimalPlaces(
              parseCurrency(taxExempted)
            );

            const taxableSalesNum = formatToTwoDecimalPlaces(
              parseCurrency(taxableSales)
            );
            const totalSalesNum = formatToTwoDecimalPlaces(
              parseCurrency(totalSales)
            );
            const vatNum = formatToTwoDecimalPlaces(parseCurrency(vat));

            // Validate Total Sales
            const expectedTotalSales = taxExemptedNum + taxableSalesNum;
            const expectedVat = taxableSalesNum * 0.13;

            cy.log(expectedTotalSales);
            cy.log(expectedVat);
            expect(totalSalesNum).to.eq(expectedTotalSales);

            // Validate VAT
            expect(vatNum).to.eq(expectedVat);
          });
        });
      });
    });
  });

  it.only("should validate calculations across multiple pages and check footer totals", () => {
    cy.getHeaderText("headerText");
    cy.get("@headerText").then((headerText) => {
      expect(headerText).to.eq("Updated Sales VAT Report");
    });
    onUpdateSalesVatReport.selectRowOnShowPage(100);
    cy.checkValueDisplayed(100);
    cy.wait(2000);
    onUpdateSalesVatReport.validateUpdateSalesVatReportCalculations();
  });
});
