const {
  onDashboardPage,
} = require('../../../../support/PageObjects/DashboardPage/DashboardPage.po');
const {
  onUpdateSalesVatReport,
} = require('../../../../support/PageObjects/Reports/IRDReports/UpdatedSalesVatReportPage.po');
// import neatCsv from 'neat-csv';
const neatCSV = require('neat-csv');
const path = require('path');
const fs = require('fs');

describe('Updated Sales Vat Report Test', () => {
  const invoiceNum = 'DM-ABI/0000004/81-82';

  // beforeEach('Login', () => {
  //   cy.login(Cypress.env('username'), Cypress.env('password'));
  //   cy.visit('/');
  //   onDashboardPage.hoverMouseOverReports();
  //   onDashboardPage.hoverMouseOverIrdReports();
  //   onDashboardPage.openUpdatedSalesVatReport();
  //   cy.reload();
  // });

  it('Verify Updated Sales Vat Report', () => {
    cy.getHeaderText('headerText');
    cy.get('@headerText').then((headerText) => {
      expect(headerText).to.eq('Updated Sales VAT Report');
    });

    onUpdateSalesVatReport.searchByInvoiceNumber(invoiceNum);
    onUpdateSalesVatReport.getTotalSales(invoiceNum, 'totalSales');
    onUpdateSalesVatReport.getTaxExempted(invoiceNum, 'taxExempted');
    onUpdateSalesVatReport.getTaxableSales(invoiceNum, 'taxableSales');
    onUpdateSalesVatReport.getVat(invoiceNum, 'vat');
    cy.get('@totalSales').then((totalSales) => {
      cy.log(totalSales);

      cy.get('@taxExempted').then((taxExempted) => {
        cy.log(taxExempted);

        cy.get('@taxableSales').then((taxableSales) => {
          cy.log(taxableSales);

          cy.get('@vat').then((vat) => {
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

  it('should validate calculations across multiple pages and check footer totals', () => {
    cy.getHeaderText('headerText');
    cy.get('@headerText').then((headerText) => {
      expect(headerText).to.eq('Updated Sales VAT Report');
    });
    onUpdateSalesVatReport.selectRowOnShowPage(100);
    cy.checkValueDisplayed(100);
    cy.wait(2000);
    onUpdateSalesVatReport.validateUpdateSalesVatReportCalculations();
  });
  it.only('should click date picker ', () => {
    const downloadFolder = Cypress.config('downloadsFolder');
    const filePath = path.join(
      downloadFolder,
      'SALES_VAT_REPORT_2024_11_10_12_52_26.csv'
    );

    // Step 3: Wait for the file to download and verify its existence
    cy.readFile(filePath, { timeout: 1000 })
      .should('exist') // Ensure the file exists
      .and((fileContent) => {
        expect(fileContent.length).to.be.gt(0); // Ensure the file is not empty
      });

    // Step 4: Read and parse the CSV content, then verify the data
    cy.readFile(filePath)
      .then(neatCSV) // Parse CSV to JSON
      .then((csvData) => {
        console.log(`SUraj NAnand dadata: ${JSON.stringify(csvData)}`);
        // Verify that the CSV has rows
        expect(csvData).to.have.length.greaterThan(0);

        // Initialize variables to accumulate the sums
        let sumTotalSales = 0;
        let sumTaxFreeSales = 0;
        let sumTaxableSales = 0;
        let sumVat = 0;

        // Step : Validate column names
        const expectedColumns = [
          'Date',
          'Bill No',
          'Buyers Name',
          'Buyers PAN Number',
          'Total Sales',
          'Tax Free Sales',
          'Taxable Sales',
          'Vat',
          'Export Product or Service price',
          'Export Country',
          'Export PPN No.',
          'Export PPN Date',
        ];
        // get value of first row of the csv file

        const actualColNames = Object.keys(csvData[0]);

        expectedColumns.forEach((column) => {
          expect(actualColNames).to.include(column);
        });

        // Check specific data points in the CSV
        csvData.forEach((row, index) => {
          // Ensure the row has the necessary columns
          expect(row).to.have.property('Total Sales');
          expect(row).to.have.property('Tax Free Sales');
          expect(row).to.have.property('Taxable Sales');
          expect(row).to.have.property('Vat');

          // Step : Validate that Total Sales = Tax Free Sales + Taxable Sales
          const totalSales = parseFloat(row['Total Sales']);
          const taxFreeSales = parseFloat(row['Tax Free Sales']);
          const taxableSales = parseFloat(row['Taxable Sales']);
          const vat = parseFloat(row['Vat']);

          const calculatedTotalSales = taxFreeSales + taxableSales;

          // Assert that Total Sales is equal to the sum of Tax Free Sales and Taxable Sales
          expect(totalSales).to.be.closeTo(
            calculatedTotalSales,
            0.01,
            'Total Sales is equal to the sum of Tax Free Sales and Taxable Sales'
          );

          // Step : Validate that Vat = 13% of Taxable Sales
          const expectedVat = taxableSales * 0.13;

          // Assert that Vat is 13% of Taxable Sales
          expect(vat).to.be.closeTo(
            expectedVat,
            0.01,
            'Vat is  13% of Taxable Sales'
          );
          if (index < csvData.length - 1) {
            sumTotalSales += totalSales;
            sumTaxFreeSales += taxFreeSales;
            sumTaxableSales += taxableSales;
            sumVat += vat;
          }
        });
        // Step 6: Validate the last row sums
        const lastRow = csvData[csvData.length - 1];
        const lastTotalSales = parseFloat(lastRow['Total Sales']);
        const lastTaxFreeSales = parseFloat(lastRow['Tax Free Sales']);
        const lastTaxableSales = parseFloat(lastRow['Taxable Sales']);
        const lastVat = parseFloat(lastRow['Vat']);

        // Assert that the last row's values match the sum of previous rows
        expect(lastTotalSales).to.be.closeTo(
          sumTotalSales,
          0.01,
          'Last row Total Sales is the sum of previous rows'
        );
        expect(lastTaxFreeSales).to.be.closeTo(
          sumTaxFreeSales,
          0.01,
          'Last row Tax Free Sales is  the sum of previous rows'
        );
        expect(lastTaxableSales).to.be.closeTo(
          sumTaxableSales,
          0.01,
          'Last row Taxable Sales is  the sum of previous rows'
        );
        expect(lastVat).to.be.closeTo(
          sumVat,
          0.01,
          'Last row Vat is  the sum of previous rows'
        );
      });
  });

  it('should download and verify the VAT report with dynamic filename', () => {
    // Step 1: Trigger download steps in your application
    // Open the date picker to select the date range for the report
    cy.get('.datepicker-content').click();

    // Select 'P3M' option in the date picker dropdown (last 3 months)
    cy.get('.filter-dropdown-card').contains('.date-item', 'P3M').click();

    // Click the 'Apply' button to confirm the selected date range
    cy.get('.date-input-wrap button').contains('Apply').click();

    // Optional: Assert that the selected date range is applied correctly
    cy.get('.datepicker-content').should('contain', 'P3M');

    // Step 2: Trigger the download by clicking the download icon
    cy.get('.filter-item ').find('[class="icon download"]').click();

    // Step 3: Select the report type 'Updated Sales VAT Report csv' to download
    cy.get('.filter-dropdown-card ')
      .contains('li', 'Updated Sales VAT Report csv')
      .click();

    // Step 4: Define the downloads folder and the prefix for the downloaded file
    const downloadsFolder = Cypress.config('downloadsFolder'); // Default downloads folder
    const filePrefix = 'SALES_VAT_REPORT_'; // Prefix to match the downloaded file name

    // Step 5: Wait for the downloaded file to appear in the downloads folder
    cy.task('getDownloadedFile', { downloadsFolder, filePrefix }).then(
      (fileName) => {
        const filePath = path.join(downloadsFolder, fileName); // Full path of the downloaded file

        // Step 6: Check if the file exists and has content
        cy.readFile(filePath, { timeout: 10000 }) // Wait for file to be fully written
          .should('exist') // Ensure the file exists
          .and((fileContent) => {
            expect(fileContent.length).to.be.gt(0); // Verify that the file is not empty
          });

        // Step 7: Parse the CSV file and validate its contents
        cy.readFile(filePath)
          .then(neatCSV) // Parse CSV data using neatCSV (a CSV parsing library)
          .then((csvData) => {
            expect(csvData).to.have.length.greaterThan(0); // Ensure the CSV contains rows of data

            // Step 8: Define the expected column names
            const expectedColumns = [
              'Date',
              'Bill No',
              'Buyers Name',
              'Buyers PAN Number',
              'Total Sales',
              'Tax Free Sales',
              'Taxable Sales',
              'Vat',
              'Export Product or Service price',
              'Export Country',
              'Export PPN No.',
              'Export PPN Date',
            ];

            // Verify that the CSV contains the expected columns
            const actualColNames = Object.keys(csvData[0]); // Get column names from the first row of CSV data
            expectedColumns.forEach((column) => {
              expect(actualColNames).to.include(column); // Check if each expected column is present
            });

            // Step 9: Validate the data in each row of the CSV
            let sumTotalSales = 0;
            let sumTaxFreeSales = 0;
            let sumTaxableSales = 0;
            let sumVat = 0;

            // Loop through each row to validate sales and VAT calculations
            csvData.forEach((row, index) => {
              const totalSales = parseFloat(row['Total Sales']);
              const taxFreeSales = parseFloat(row['Tax Free Sales']);
              const taxableSales = parseFloat(row['Taxable Sales']);
              const vat = parseFloat(row['Vat']);
              const calculatedTotalSales = taxFreeSales + taxableSales;

              // Validate that Total Sales = Tax Free Sales + Taxable Sales
              expect(totalSales).to.be.closeTo(calculatedTotalSales, 0.01);

              // Validate that VAT is 13% of Taxable Sales
              const expectedVat = taxableSales * 0.13;
              expect(vat).to.be.closeTo(expectedVat, 0.01);

              // Accumulate totals for validation against the last row
              if (index < csvData.length - 1) {
                sumTotalSales += totalSales;
                sumTaxFreeSales += taxFreeSales;
                sumTaxableSales += taxableSales;
                sumVat += vat;
              }
            });

            // Step 10: Validate the totals in the last row of the CSV
            const lastRow = csvData[csvData.length - 1];
            expect(parseFloat(lastRow['Total Sales'])).to.be.closeTo(
              sumTotalSales,
              0.01
            );
            expect(parseFloat(lastRow['Tax Free Sales'])).to.be.closeTo(
              sumTaxFreeSales,
              0.01
            );
            expect(parseFloat(lastRow['Taxable Sales'])).to.be.closeTo(
              sumTaxableSales,
              0.01
            );
            expect(parseFloat(lastRow['Vat'])).to.be.closeTo(sumVat, 0.01);
          });
      }
    );
  });
});
