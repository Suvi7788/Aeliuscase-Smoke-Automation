import { expect } from "@playwright/test";

export class AssignDocumentToUserComponent {
    constructor(page) {
        this.page = page;
        this.notifyField = page.getByRole('combobox');
        this.notifyUser = page.getByRole('option', { name: 'suvi dison' })
    }

    async assignDocumentToUser() {
        await this.notifyField.click();
        await this.notifyUser.click();
    }
}
//need to add selectors to notify field