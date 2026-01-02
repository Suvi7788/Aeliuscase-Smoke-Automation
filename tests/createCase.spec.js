const { test } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { WcabCaseForm } = require("../pages/components/WcabCaseForm");
const { Menu } = require("../pages/Menu");
const { CasePage } = require("../pages/CasePage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Create Case', () => {
    test('Create WCAB Case', async ({ page }) => {
        const { faker } = await import('@faker-js/faker');
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.openCaseForm();
        const wcabCaseForm = new WcabCaseForm(page);
        await wcabCaseForm.createCase(faker.person.firstName(), faker.person.lastName(), faker.company.name());
        await wcabCaseForm.verifyCaseCreation();
    })
})

test.describe('Create WCAB Case From Recent Case List', () => {
    test('Create WCAB Case From Recent Case List', async ({ page }) => {
        const { faker } = await import('@faker-js/faker');
        const menu = new Menu(page);
        const casePage = new CasePage(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseForm();
        const wcabCaseForm = new WcabCaseForm(page);
        await wcabCaseForm.createCase(faker.person.firstName(), faker.person.lastName(), faker.company.name());
        await wcabCaseForm.verifyCaseCreation();
    })
})