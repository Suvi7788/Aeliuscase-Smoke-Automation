const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const {EmailPage} = require("../../pages/email/EmailPage");
const { EmailSettingsSection } = require("../../pages/email/sections/EmailSettingsSection");
const emailData = require("../../data/emailData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add New Email', () => {
    test('Add New Gmail Account', async ({ page }) => {
        const menu = new Menu(page);
        const emailSettingsSection = new EmailSettingsSection(page);
        const emailPage = new EmailPage(page);
        await menu.navigate("email", "emailSettings");
        await emailPage.navigateToEmailSettings();
        await emailSettingsSection.openAddEmailForm();
        await emailSettingsSection.selectEmailType(emailData.gmailType);
        await emailSettingsSection.setEmail(emailData.gmail);
        await emailSettingsSection.submitEmailForm();
        await emailSettingsSection.verifyEmailAdded();
    })

     test('Add New Outlook Account', async ({ page }) => {
        const menu = new Menu(page);
        const emailSettingsSection = new EmailSettingsSection(page);
        const emailPage = new EmailPage(page);
        await menu.navigate("email", "emailSettings");
        await emailPage.navigateToEmailSettings();
        await emailSettingsSection.openAddEmailForm();
        await emailSettingsSection.selectEmailType(emailData.outlookType);
        await emailSettingsSection.setEmail(emailData.outlook);
        await emailSettingsSection.submitEmailForm();
        await emailSettingsSection.verifyEmailAdded();
    })
})
