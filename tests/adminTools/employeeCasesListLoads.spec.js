const { test } = require("@playwright/test");
const UserData = require("../../data/UserData.json");


const { SettingsPanal } = require("../../pages/firm/settingsPanal");
const { EmployeeCasesPage } = require("../../pages/firm/adminTools/employeeCasesPage");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('Employee Cases List Loads', async ({ page }) => {
    test.setTimeout(60000);
    const settingsPanal = new SettingsPanal(page);
    await settingsPanal.openSettingsPanal();
    await settingsPanal.openAdminToolsDropdown(); 
    await settingsPanal.openEmployeeCases();
    const employeeCasesPage = new EmployeeCasesPage(page);
    await employeeCasesPage.verifyEmployeeCasesListLoads();
});

