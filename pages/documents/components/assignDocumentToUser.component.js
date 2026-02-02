import { expect } from "@playwright/test";
const documentData = require("../../../data/documentData.json");

export class AssignDocumentToUserComponent {
    constructor(page) {
        this.page = page;
        this.notifyField = page.getByRole('combobox');
        this.notifyUser = page.getByRole('option', { name: documentData.AssigneeValue })
    }

    async assignDocumentToUser() {
        await this.notifyField.click();
        await this.notifyUser.click();
    }
}
//need to add selectors to notify field