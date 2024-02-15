export class PromotionsPage {


    searchIconELe = '.search-input > div > .sc-jSUZER'
    searchBoxEle = '#searchId'
    dateFilterEle = '.datepicker-content'
    standardFilterEle = '.filter-icon > .sc-jSUZER'
    filtePlusIconEle = '.filter-btn.add > .kHoScB'
    filterDropdownEle = '.filter-select__input-container'
    filterDropDownValueEle = 'div.filter-select__option'
    // filterItemValueELe = 'span.filter-item-name'
    filterItemValueELe = '.filter-contain-group.custom-scroll > div'

    createIconEle = "svg[class$='icon plus']"
    threeDotMenuEle = 'tbody tr td'
    deleteEle = '[class="sc-dmctIk fxpFKY"]'
    dialogHeaderText = "header[class='evolve-dialog__header'] div h2"
    dialogMessageEle = ".evolve-dialog__body"
    okButtonEle = ".dSdSlu"
    cancelButtonEle = ".gvjoda"
    alertMessageEle = ".alert-message"

    checkBoxELe = '.sc-iBYQkv > label > .control-label'
    deleteIconEle = '.del-btn'


    isSeachIconDisplayed() {
        return cy.get(this.searchIconELe)
    }

    isSeachBoxDisplayed() {
        return cy.get(this.searchBoxEle)
    }

    isDateFilteIconDisplayed() {
        return cy.get(this.dateFilterEle)
    }

    isStandartFilteIconDisplayed() {
        return cy.get(this.standardFilterEle)
    }

    isExistingPromotionDisplayed () {
        return cy.get('tbody tr')
    }
    clickOnStandardFilter() {
        cy.get(this.standardFilterEle).should('be.visible').click({ force: true })
    }

    clickOnPlusIconOfFilter() {
        cy.get(this.filtePlusIconEle).should('be.visible').click({ force: true })
    }

    clickOnFilterDropdown() {
        cy.get(this.filterDropdownEle).should('be.visible').click({ force: true })
    }

    selectDropDownValue(value) {
        cy.contains(this.filterDropDownValueEle, value).click({ force: true })
    }

    isfilterItemValueDisplayed() {
        return cy.get(this.filterItemValueELe)
    }



    verifyFilterItemValue(desiredValue) {

        cy.get(this.filterItemValueELe).each((option, index) => {
            cy.wrap(option).invoke('text').should('eq', desiredValue[index]);
        })
    }

    /**
     * This functions will check if the list are sorted or not
     */
    checkSortingOfFilterItemValue() {
        cy.get(this.filterItemValueELe).then(($listItems) => {
            // Extract text content from the list elements
            const textArray = $listItems.map((index, element) => Cypress.$(element).text().trim()).get();

            // Check if the array is sorted alphabetically
            const isSorted = this.isAlphabeticallySorted(textArray);
            cy.log(textArray)
            cy.wrap(isSorted).should('be.true');
        })
    }


    /**
     * 
     * @param {*} expectedValue This function will compare the expected Array with Actual Array
     */
    checkAndCompareFilterValue(expectedValue) {
        cy.compareTwoArrayValue(this.filterItemValueELe,expectedValue)
    }


    /**
     * 
     * @param {*} unsortedArray This function will sort an unsorted Array
     */
    sortItemValues(unsortedArray) {
        const sortedArray = unsortedArray.slice().sort((a, b) => a.localeCompare(b));

        // Log the sorted array
        cy.log('Before Sorting:', unsortedArray);
        cy.log('After SOrting:', sortedArray);
    }

    /**
     * 
     * @param {*} array This function will check if the array is sorted or not and retun true or false
     * @returns 
     */
    isAlphabeticallySorted(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i].localeCompare(array[i + 1]) > 0) {
                return false; // Not sorted alphabetically
            }
        }
        return true; // Sorted alphabetically
    }

    isCreatIconDisplayed() {
        return cy.get(this.createIconEle)
    }

    clickCreateIcon() {
        cy.get(this.createIconEle).should('be.visible').click()
        cy.wait(1000)
    }


    searchPromotion(text) {
        cy.wait(1000)
        this.clickOnSearchIcon()
        cy.wait(1000)
        this.enterValueInSearchBox(text)
    }

    checkSearchedValueIsDisplayed(text) {
        cy.wait(1000)
        cy.contains('tbody tr td', text)
    }

    clickOnSearchIcon() {
        cy.get(this.searchIconELe).should('be.visible').click({ force: true })
    }

    enterValueInSearchBox(text) {
        cy.wait(1000)
        cy.get(this.searchBoxEle).should('be.visible').type(text + '{enter}', { force: true })
       
    }

    openPromotionDetail(text) {
        cy.wait(1000)
        cy.contains('tbody tr td', text).click({ force: true })
    }

    /**
     * This function will click on three dot menu
     */
    clickThreeDotMenu() {
        cy.get('.filter-item > :nth-child(1) > :nth-child(1) > .sc-jSUZER > .sc-eDvSVe').click({ force: true })
    }

    /**
     * This function will click on Delete 
     */
    clickDelete() {
        cy.get(this.deleteEle).click({ force: true })
    }

    /**
     * 
     * @returns Header text of Confirmation dialog
     */
    getDeleteDialogHeaderText() {
        return cy.get(this.dialogHeaderText)
    }

    /**
     * 
     * @returns Message of the dialog
     */
    getDialogMessage() {
        return cy.get(this.dialogMessageEle).should('be.visible')
    }

    /**
     * Click on OK button
     */
    clickOkButton() {
        cy.get(this.okButtonEle).click({ force: true })
    }

    /**
     * Click on Cancel Button
     */
    clickCancelButton() {
        cy.get(this.cancelButtonEle).click({ force: true })
    }

    /**
     * 
     * @returns Alert Message
     */
    getAlertMessage() {
        return cy.get(this.alertMessageEle)
    }

    checkElementIsDisplayed() {
        return cy.get('tbody > :nth-child(1) > :nth-child(3)')
    }

    /**
     * 
     * @param {index} index This function select checkbox as per index number
     */
    selectCheckBoxes(index) {
        cy.get(this.checkBoxELe).eq(index).click({ force: true })
    }

    clickOnDeleteIcon() {
        cy.get(this.deleteIconEle).should('be.visible').click({ force: true })
    }

    getTableHeaderText(index) {
        return cy.get('thead tr th').eq(index).should('be.visible')
    }


    getPromotionId () {
       return cy.get('tbody > :nth-child(1) > :nth-child(2)')
    }

    getPromotionTitle () {
       return  cy.get('tbody > :nth-child(1) > :nth-child(3)')
    }

    openPromotionDetail(title) {
        cy.contains('tbody tr td',title).click({force:true})
    }




    
    
}


export const onPromotionsPage = new PromotionsPage()