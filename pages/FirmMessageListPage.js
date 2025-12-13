const {MessageForm} = require("./components/MessageForm");
const { expect } = require("@playwright/test");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');


class FirmMessageListPage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page;
        this.messageForm = new MessageForm(page);

        this.AddMessageBtn = page.getByRole('button').nth(1);
    }
    async openMessageForm() {
        await this.AddMessageBtn.click();
    }
    async createFirmMessageListMessage(caseNo, user, Details) {
        await this.openMessageForm();
        await this.messageForm.fillMessageForm(caseNo, user, Details);
        await this.messageForm.submitMessageForm();
    }
    async verifyMessageCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }
    async verifyMessageInMessageList() {
        await this.gotoAndWaitForAPI(routes.MessageList, endpoints.getMessageList);
    }
}
module.exports = { FirmMessageListPage };





