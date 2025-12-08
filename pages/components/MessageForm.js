class MessageForm {
    constructor(page) {
        this.page = page;
        this.CaseNo = page.getByRole('complementary').locator('input[name="undefined"]')
        this.ForField = page.locator("//li[@role='option']//input[@role='combobox']")
        this.Details = page.locator('div.ql-editor.ql-blank')
        this.SaveBtn = page.getByRole('button', { name: 'Save' });
    }

    async fillMessageForm(caseNo, user, Details) {
        await this.CaseNo.click();
        await this.CaseNo.fill(caseNo);
        await this.ForField.click(user);
        await this.ForField.fill(user);
        await this.Details.click();
        await this.Details.fill(Details);

    }

    async submitMessageForm() {
        await this.SaveBtn.click();

    }
}   
module.exports = { MessageForm };