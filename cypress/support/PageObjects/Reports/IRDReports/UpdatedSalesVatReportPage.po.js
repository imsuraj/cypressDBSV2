// Helper function to parse currency strings
function parseCurrency(value) {
  return parseFloat(value.replace(/,/g, ''));
}

// Format function, if not already defined
function formatToTwoDecimalPlaces(value) {
  return parseFloat(value).toFixed(2);
}

export class UpdatedSalesVatReportPage {
  searchByInvoiceNumber(invoiceNumber) {
    cy.searchByText(invoiceNumber);
    // cy.wait(2000)
    cy.contains('tbody tr td', invoiceNumber);
  }

  selectRowOnShowPage(rowNum) {
    cy.selectRowValueOnPage(rowNum);
  }
  getTotalSales(invoiceNumber, alias) {
    cy.contains('tr', invoiceNumber).then((tableRow) => {
      cy.wrap(tableRow)
        .find('td')
        .eq(4)
        .invoke('text')
        .then((totalSales) => {
          cy.wrap(totalSales).as(alias);
        });
    });
  }

  getTaxExempted(invoiceNumber, alias) {
    cy.contains('tr', invoiceNumber).then((tableRow) => {
      cy.wrap(tableRow)
        .find('td')
        .eq(5)
        .invoke('text')
        .then((totalSales) => {
          cy.wrap(totalSales).as(alias);
        });
    });
  }

  getTaxableSales(invoiceNumber, alias) {
    cy.contains('tr', invoiceNumber).then((tableRow) => {
      cy.wrap(tableRow)
        .find('td')
        .eq(6)
        .invoke('text')
        .then((totalSales) => {
          cy.wrap(totalSales).as(alias);
        });
    });
  }

  getVat(invoiceNumber, alias) {
    cy.contains('tr', invoiceNumber).then((tableRow) => {
      cy.wrap(tableRow)
        .find('td')
        .eq(7)
        .invoke('text')
        .then((totalSales) => {
          cy.wrap(totalSales).as(alias);
        });
    });
  }

  validateUpdateSalesVatReportCalculations() {
    let grandTotalSales = 0;
    let grandTaxExempted = 0;
    let grandTaxableSales = 0;
    let grandVAT = 0;

    cy.get('tbody')
      .find('tr')
      .each(($row) => {
        const totalSales = parseCurrency($row.find('td').eq(4).text());
        const taxExempted = parseCurrency($row.find('td').eq(5).text());
        const taxableSales = parseCurrency($row.find('td').eq(6).text());
        const vat = parseCurrency($row.find('td').eq(7).text());

        const expectedTotalSales = formatToTwoDecimalPlaces(
          taxExempted + taxableSales
        );

        expect(totalSales.toFixed(2)).to.equal(expectedTotalSales);

        const expectedVat = (taxableSales * 0.13).toFixed(2);
        expect(formatToTwoDecimalPlaces(vat), 'Vat check').to.equal(
          expectedVat
        );

        grandTotalSales += totalSales;
        grandTaxExempted += taxExempted;
        grandTaxableSales += taxableSales;
        grandVAT += vat;
      })
      .then(() => {
        cy.wrap(formatToTwoDecimalPlaces(grandTotalSales)).as(
          'expectedGrandTotalSales'
        );
        cy.wrap(formatToTwoDecimalPlaces(grandTaxExempted)).as(
          'expectedGrandTaxExempted'
        );
        cy.wrap(formatToTwoDecimalPlaces(grandTaxableSales)).as(
          'expectedGrandTaxableSales'
        );
        cy.wrap(formatToTwoDecimalPlaces(grandVAT)).as('expectedGrandVat');
      });

    this.getGrandTotalSalesValue('actualGrandTotalSales');
    this.getGrandTaxExemptedSalesValue('actualGrandTaxExemptedSales');
    this.getGrandTaxableSalesValue('actualGrandTaxableSales');
    this.getGrandVatValue('actualGrandVatSales');

    cy.get('@expectedGrandTotalSales').then((expectedGrandTotalSales) => {
      cy.get('@actualGrandTotalSales').then((actualGrandTotalSales) => {
        expect(
          formatToTwoDecimalPlaces(parseCurrency(actualGrandTotalSales))
        ).to.equal(expectedGrandTotalSales);
      });
    });

    cy.get('@expectedGrandTaxExempted').then((expectedGrandTaxExempted) => {
      cy.get('@actualGrandTaxExemptedSales').then(
        (actualGrandTaxExemptedSales) => {
          expect(
            formatToTwoDecimalPlaces(parseCurrency(actualGrandTaxExemptedSales))
          ).to.equal(expectedGrandTaxExempted);
        }
      );
    });

    cy.get('@expectedGrandTaxableSales').then((expectedGrandTaxableSales) => {
      cy.get('@actualGrandTaxableSales').then((actualGrandTaxableSales) => {
        expect(
          formatToTwoDecimalPlaces(parseCurrency(actualGrandTaxableSales))
        ).to.equal(expectedGrandTaxableSales);
      });
    });

    cy.get('@expectedGrandVat').then((expectedGrandVat) => {
      cy.get('@actualGrandVatSales').then((actualGrandVatSales) => {
        expect(
          formatToTwoDecimalPlaces(parseCurrency(actualGrandVatSales))
        ).to.equal(expectedGrandVat);
      });
    });
  }

  getGrandValue(index, aliasName) {
    cy.get('tfoot.MuiTableFooter-root tr.MuiTableRow-footer').within(() => {
      cy.get('td')
        .eq(index)
        .invoke('text')
        .then((text) => {
          cy.wrap(text.trim()).as(aliasName);
        });
    });
  }

  // Usage:
  getGrandTotalSalesValue(aliasName) {
    this.getGrandValue(2, aliasName);
  }

  getGrandTaxExemptedSalesValue(aliasName) {
    this.getGrandValue(3, aliasName);
  }

  getGrandTaxableSalesValue(aliasName) {
    this.getGrandValue(4, aliasName);
  }

  getGrandVatValue(aliasName) {
    this.getGrandValue(5, aliasName);
  }

  clickOnDatePicker() {
    cy.get('.datepicker-content').click();
  }
}

export const onUpdateSalesVatReport = new UpdatedSalesVatReportPage();
