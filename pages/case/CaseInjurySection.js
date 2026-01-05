const { expect } = require("@playwright/test");

class CaseInjurySection {
    constructor(page) {
        this.page = page;
        this.injuryEditButton=page.getByText('Edit', { exact: true });
        this.injuryDescription=page.getByRole('textbox', { name: 'The injury occurred as follows' });
        this.injurySaveButton=page.getByRole('button', { name: 'Save' });
        this.addNewInjuryButton=page.locator('[ptooltip="Add New Injury"]');
        this.doiField=page.locator('[formcontrolname="doiStart"]').nth(1);
    }

    async navigateToEditInjury(){
        await this.injuryEditButton.click();
    }

    async updateInjuryDescription(description){
        await this.injuryDescription.fill(description);
    }

    async saveInjuryDescription(){
        await this.injurySaveButton.click();
    }

    async verifyInjuryUpdate(){
        await expect(this.page.getByText('Injury successfully updated')).toBeVisible();
    }

    async openAddNewInjuryForm(){
        await this.addNewInjuryButton.click();
    }

    async fillAddNewInjuryForm(doi){
        await this.doiField.fill(doi);
    }

    async verifyInjurySave(){
        
    }

}

module.exports = CaseInjurySection;
