import { expect } from "@playwright/test";
export class AssignDocumentToCaseComponent {
    constructor(page) {
        this.page = page;
        this.CaseNo = page.getByRole('combobox', { name: 'Select a Case' }).first();
        this.CaseValue = page.locator('span:has-text("Automation vs DO NOT DELETE")');
        this.saveBtn = page.locator('button[ptooltip="Click to Save"]').first();
    }

    async assignDocumentToCase(caseNo) {
        await this.CaseNo.fill(caseNo);
        await this.CaseValue.click();
    }

    async saveDocument() {
        await this.saveBtn.click();
    }
    async verifySaveSuccess() {
        await expect(this.page.getByText('assigned successfully')).toBeVisible();
    }
}