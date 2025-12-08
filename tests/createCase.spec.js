const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CaseCreationPage } = require("../pages/CaseCreationPage");



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Create Case', () => {
    test('Create WCAB Case', async ({ page }) => {
        const { faker } = await import('@faker-js/faker');
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.openCaseForm();
        const caseCreationPage = new CaseCreationPage(page);
        await caseCreationPage.createCase(faker.person.firstName(), faker.person.lastName(), faker.company.name());
        await caseCreationPage.verifyCaseCreation();
    })
})