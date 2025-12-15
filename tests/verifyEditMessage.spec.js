const { test, expect } = require('@playwright/test');
const { FirmDashboardPage } = require('../pages/FirmDashboardPage');
const routes = require('../config/routes');
const { MessageForm } = require('../pages/components/MessageForm');

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Verify Edit Message', () => {
    test('Verify Edit Message', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        const messageForm = new MessageForm(page);
        await firmDashboardPage.openEditMessageForm();
        await messageForm.editMessageDetails('Updated Details');
        await messageForm.submitMessageForm();
        await expect(page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
        
    });
});