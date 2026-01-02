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
        this.deleteMessageBtn = page.locator('//tbody/tr[4]/td[9]/button[1]/span[1]');
        this.deleteConfermationMsg = page.locator("//span[normalize-space()='Proceed']");
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
    async verifyMessageListNavigation() {
        await expect(this.page).toHaveURL(/\/dashboard\/phone-call-messages\//);
    }


    async deleteMessage() {
        if (!await this.deleteMessageBtn.isVisible({ timeout: 3000 })) {
            throw new Error('Pre-condition failed: Test message not found');
        }
        await this.deleteMessageBtn.click();
        await this.deleteConfermationMsg.click(); 
    }
    
    async verifyDeleteMessage() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }
}
module.exports = { FirmMessageListPage };





