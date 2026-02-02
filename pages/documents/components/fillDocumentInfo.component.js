import { expect } from "@playwright/test";
export class FillDocumentInfoComponent {
    constructor(page) {
        this.page = page;
        this.CaseNo = page.getByRole('combobox', { name: 'Select a Case' }).first();
        this.CaseValue = page.locator('span:has-text("Automation vs DO NOT DELETE")');
        this.docTypeDropdown = page.locator('#pn_id_466 > .p-element.p-dropdown-label');
        this.docTypeValue = page.getByRole('option', { name: 'WCAB' });
        this.docCategoryDropdown = page.locator('.p-element.p-dropdown-label.p-inputtext.p-dropdown-label-empty').first();
        this.docCategoryValue = page.getByRole('option', { name: 'Client' });
        this.docSubCategoryDropdown = page.locator('#pn_id_470 > .p-element.p-dropdown-label');
        this.docSubCategoryValue = page.getByRole('option', { name: 'Doctor' });
        // this.Notes = page.locator('textarea[pinputtext]');
        this.saveBtn = page.locator('button[ptooltip="Click to Save"]').first();
    }

    async fillDocumentInfo(caseNo, Details) {
        await this.CaseNo.fill(caseNo);
        await this.CaseValue.click();
        await this.docTypeDropdown.click();
        await this.docTypeValue.click();
        await this.docCategoryDropdown.click();
        await this.docCategoryValue.click();
        await this.docSubCategoryDropdown.click();
        await this.docSubCategoryValue.click();
        // await this.Notes.fill(Details);
        await this.saveBtn.click();
    }
    async verifySaveSuccess() {
        await expect(this.page.getByText('assigned successfully')).toBeVisible();
    }
}