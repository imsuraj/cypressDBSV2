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
    dialogMessageEle = ".evolve-dialog__body > span"
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

    clickOnStandardFilter() {
        cy.get(this.standardFilterEle).should('be.visible').click({force:true})
    }

    clickOnPlusIconOfFilter () {
        cy.get(this.filtePlusIconEle).should('be.visible').click({force:true})
    }

    clickOnFilterDropdown() {
        cy.get(this.filterDropdownEle).should('be.visible').click({force:true})
    }

    selectDropDownValue(value) {
        cy.contains(this.filterDropDownValueEle,value).click({force:true})
    }
    
    isfilterItemValueDisplayed () {
        return cy.get(this.filterItemValueELe)
    }

    getFilterItemValue(aliasName) {
        cy.get(this.filterItemValueELe).invoke('text').then((itemValue) => {
            cy.wrap(itemValue).as(aliasName)
        })
    }


    testArray () {
        cy.get(this.filterItemValueELe)
            .invoke('text')
            .then((dropdownValues) => {
                const dropdownArray = dropdownValues.split(', ');

                // Sort the dropdown values alphabetically
                const sortedDropdownArray = dropdownArray.slice().sort();
        
                // Log the original and sorted dropdown values
                cy.log('Original Dropdown Values:', dropdownArray);
                cy.log('Sorted Dropdown Values:', sortedDropdownArray);

                let a = ['asdf','sdfdf','sdfsdfsdf']
                console.log(a)
            })

    }

    isCreatIconDisplayed() {
        return cy.get(this.createIconEle)
    }

    clickCreateIcon () {
        cy.get(this.createIconEle).should('be.visible').click()
    }


    searchPromotion(text) {
        this.clickOnSearchIcon()
        this.enterValueInSearchBox(text)
    }

    checkSearchedValueIsDisplayed(text) {
        cy.contains('tbody tr td',text)
    }

    clickOnSearchIcon() {
        cy.get(this.searchIconELe).should('be.visible').click({force:true})
    }

    enterValueInSearchBox(text) {
        cy.get(this.searchBoxEle).should('be.visible').type(text+'{enter}', {force:true})
        cy.wait(1000)
    }

    openPromotionDetail(text) {
        cy.contains('tbody tr td',text).click({force:true})
    }

    /**
     * This function will click on three dot menu
     */
    clickThreeDotMenu () {
        cy.get('.filter-item > :nth-child(1) > :nth-child(1) > .sc-jSUZER > .sc-eDvSVe').click({force:true})
    }

    /**
     * This function will click on Delete 
     */
    clickDelete() {
        cy.get(this.deleteEle).click({force:true})
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
        cy.get(this.okButtonEle).click({force:true})
    }

    /**
     * Click on Cancel Button
     */
    clickCancelButton() {
        cy.get(this.cancelButtonEle).click({force:true})
    }

    /**
     * 
     * @returns Alert Message
     */
    getAlertMessage () {
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
        cy.get(this.checkBoxELe).eq(index).click({force:true})
    }

    clickOnDeleteIcon() {
        cy.get(this.deleteIconEle).should('be.visible').click({force:true})
    }

    getTableHeaderText(index) {
        return cy.get('thead tr th').eq(index).should('be.visible')
    }
}


export const onPromotionsPage = new PromotionsPage()