import CreateJournalVoucher from "../../../support/PageObjects/JournalVoucherPage";
const currentDate = new Date();
const timestamp = currentDate.getTime();


describe("Create Journal Voucher Test", () => {
    let title



    beforeEach(() => {
        // cy.fixture('promotions').as('data'); // Load the fixture data
        cy.fixture('jvSubLedgers').as('data'); // Load the fixture data
        cy.visit(Cypress.env().baseUrl, { retryOnStatusCodeFailure: true, retry: 3 })
        cy.login(Cypress.env('email'), Cypress.env('password'))
        cy.wait(2000)
        cy.url().should('include', '/dashboard')

        cy.get(':nth-child(1) > :nth-child(7) > button').trigger('mouseover')
        cy.get("a[href='/accounting-entries/journal-voucher']").click()
        cy.get('h2').should("have.text", "Journal Voucher")
        cy.wait(2000)
        cy.reload(true)
        cy.get(':nth-child(5) > .sc-jSUZER').should("be.visible").click({ force: true })
        cy.wait(2000)
        // cy.visit("https://staging.dbs.upaya.rosia.one/accounting-entries/journal-voucher/create")

    })

    it("Verify mandatory message is displayed", () => {
        const jv = new CreateJournalVoucher()

        jv.isSaveBtnDisplayed()
        // jv.clickSaveBtn()


        jv.selectBranch("SANO BHARYANG-TRANSPORT BRANCH")
        jv.isSaveBtnDisplayed()
        cy.wait(1000)
        jv.selectBusinessUnit("UPAYA TRANSPORT")
       

        cy.get('@data').then((data) => {
            data.forEach((jvData) => {

                jv.clickPlusBtn()
                jv.clickPlusBtn()
                jv.selectLedger("DRIVER PAYABLE AND LOADER PAYABLE")
                jv.selectSubLedger(jvData.subLedgerName)
                // jv.enterDebitAmount(jvData.amount)
                jv.enterCreditAmount(jvData.amount)

                jv.enterRemarks("Being vehicle rental amount payable")
               

            })
        })
        jv.clickPlusBtn()
        jv.clickPlusBtn()
        jv.selectLedger("TDS - RENTAL")

        jv.enterDebitAmount("9999999")

        jv.enterRemarks("Being vehicle rental tds deducted")

        jv.clickSaveBtn()

    })


})