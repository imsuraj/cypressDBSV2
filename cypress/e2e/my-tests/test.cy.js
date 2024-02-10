describe("daf", () => {

  it('gets current date and timestamp', () => {
    // Get the current date
    const currentDate = new Date();

    // Get the current timestamp (milliseconds since January 1, 1970)
    const timestamp = currentDate.getTime();

    // Log the current date and timestamp
    cy.log('Current Date:', currentDate.toDateString());
    cy.log('Timestamp:', timestamp);
  });



  it("dsf", () => {

    const bill = "1,234,567.89"
    const trade = "1,234,567.89"
    const billWithoutCommas = bill.replace(/,/g, "");
    const tradeWithoutCommas = bill.replace(/,/g, "");

    // expect(amountWithoutCommas).to.equal("1234567.89");
    cy.log(billWithoutCommas)
    cy.log(tradeWithoutCommas)

    cy.log(billWithoutCommas + tradeWithoutCommas)
  })
})




