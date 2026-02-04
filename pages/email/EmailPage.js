class EmailPage {
    constructor(page) {
        this.page = page;
        this.emailSettingsSection = page.getByText('Settings', { exact: true })
        this.emailInboxSection = page.getByText('Inbox')
    }

    async navigateToEmailSettings() {
        await this.emailSettingsSection.click();
    }

    async navigateToEmailInbox() {
        await this.emailInboxSection.click();
    }
}
module.exports = { EmailPage };
