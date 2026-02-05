const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { EmailPage } = require("../../pages/email/EmailPage");
const { EmailSettingsSection } = require("../../pages/email/sections/EmailSettingsSection");
const emailData = require("../../data/emailData.json");
const { EmailInboxSection } = require("../../pages/email/sections/EmailInboxSection");
const { expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Send Email', () => {
    test('Send Email From Gmail', async ({ page }) => {
        const menu = new Menu(page);
        const emailInboxSection = new EmailInboxSection(page);
        await menu.navigate("email", "emailInbox");
        await page.context().storageState({ path: 'auth/email-auth.json' });
        await emailInboxSection.openComposeForm();
        // await emailInboxSection.selectFromEmail(emailData.outlook);
        await emailInboxSection.composeEmail(emailData.toEmail, emailData.subject, emailData.message);
        await emailInboxSection.sendEmail();
        await expect(emailInboxSection.page.locator('div.p-toast-detail', { hasText: 'Email successfully sent' })).toBeVisible();
    })
})
