export class CreateJournalVoucher {
    pageheader = "h2"
    btnSave = ".filter-wrap > :nth-child(2) > .sc-jSUZER"

    btnCancel = ":nth-child(1) > .sc-jSUZER > span"
    dropdownBranch = ".row > :nth-child(1) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"
    dropdownBusinessUnit = ":nth-child(2) > .sc-ftTHYK > .form-select-input > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"

    plusBtn = ".sc-jSUZER.geaTtd.secondary.iconBtnSmall.add-btn"

    dropdownLedger = ":nth-child(2) > .form-select-input > :nth-child(2) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container"
    dropdownSubLedger = ":nth-child(4) > .form-select-input > :nth-child(2) > .add-select > .select-wrap > .select-css > .zindex-2__control > .zindex-2__value-container > .zindex-2__input-container"

    txtDebit = ".debit > .form-input > #input"
    txtCredit = ".credit > .form-input > #input"
    textRemarks = ".text-left > .form-input > #input"

    filterIconEle = '.filter-icon > .sc-jSUZER'
    resetIconEle = '.filter-label > .sc-jSUZER'

    searchIconEle = '.search-input > div > .sc-jSUZER'
    searchFieldEle = '#searchId'


    removeFilterInJV() {
        cy.get(this.filterIconEle).click({ force: true });
        cy.get(this.resetIconEle).click({ force: true });
        cy.wait(1000);
    }


    searchJVwithInvoiceNumber (invoiceNumber) {
        cy.get(this.searchIconEle).click({ force: true });
        cy.get(this.searchFieldEle).type(invoiceNumber, {force: true});
        cy.wait(1000);
    }

    openJvDetailsOfSearchedInvoice(invoiceNumber) {
        cy.contains(invoiceNumber).click({force: true})
    }



    selectBranch(branchName) {
        cy.get(this.dropdownBranch).click()
        cy.selectDropdownValue(branchName)
    }

    selectBusinessUnit(buName) {
        cy.get(this.dropdownBusinessUnit).click()
        cy.selectDropdownValue(buName)
    }

    clickPlusBtn() {
        cy.get(this.plusBtn).scrollIntoView().click(true)
        //  cy.wait(1000)
        //cy.get(this.dropdownLedger).should("be.visible")
    }


    selectLedger(ledgerName) {
        cy.get(this.dropdownLedger).click()
        cy.get(this.dropdownLedger).type(ledgerName)
        cy.wait(500)
        cy.get(this.dropdownLedger).type('{enter}')

    }

    selectSubLedger(subledgerName) {
        cy.get(this.dropdownSubLedger).click()
        cy.get(this.dropdownSubLedger).type(subledgerName)
        cy.wait(500)
        cy.get(this.dropdownSubLedger).type('{enter}')

    }


    enterDebitAmount(debitAMt) {
        cy.get(this.txtDebit).should("be.visible").type(debitAMt)
        cy.wait(500)
    }

    enterCreditAmount(creditAMount) {
        cy.get(this.txtCredit).should("be.visible").type(creditAMount)
        cy.wait(500)
    }

    enterRemarks(remarks) {
        cy.get(this.textRemarks).should("be.visible").type(remarks)
    }

    getHeaderText() {
        return cy.get(this.pageheader)
    }

    isSaveBtnDisplayed() {
        cy.get(this.btnSave).invoke('show').should("be.visible")
    }

    clickSaveBtn() {
        cy.get(this.btnSave).should("be.visible").scrollIntoView().click(true)
    }

    clickCancelBtn() {
        cy.get(this.btnCancel).should("be.visible").click()
    }


}

// export default CreateJournalVoucher;
export const onJVPage = new CreateJournalVoucher();