const { expect } = require("@playwright/test");

class TextMessage {
    constructor(page) {
        this.page = page;
        this.textMessageBtn = page.locator('button[ptooltip="New Message"]');
        this.fillNameInput = page.locator('p-autocomplete[formcontrolname="toUserId"] input')
        this.selectNameOption = page.getByRole('option', { name: 'test ara office number' });
        this.sendMessageBtn = page.getByRole('button', { name: 'Send' });
        this.verifySuccessMsgConfirm = page.locator('div.p-toast-detail', { hasText: 'Create new conversation successfully' });
    }
    async addNewTextMessage() {
        await this.textMessageBtn.click();
    }
    async fillName(name){
        await this.fillNameInput.fill(name);
    }
    async selectName(){
        await this.selectNameOption.click();
    }
    async sendMessage(){
        await this.sendMessageBtn.click();
    }
    async verifySuccessMsg(){
        await expect(this.verifySuccessMsgConfirm).toBeVisible();
    }


}
module.exports = { TextMessage };