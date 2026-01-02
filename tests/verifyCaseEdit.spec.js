const { test, expect } = require("@playwright/test");
const CaseEdit = require("../pages/sections/CaseEdit");
const CaseSummarySection = require("../pages/sections/CaseSummarySection");
const { CaseDashboardSection } = require("../pages/sections/CaseDashboardSection");
const { Menu } = require("../pages/Menu");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test("Verify Case Edit", async ({ page }) => {
    const menu = new Menu(page);
    const caseDashboardSection = new CaseDashboardSection(page);
    await menu.searchForCase('AE00147');
    await caseDashboardSection.verifyNavigationToCase();
    const caseSummarySection = new CaseSummarySection(page);
    await caseSummarySection.openCaseEdit();
    const caseEdit = new CaseEdit(page);
    await caseEdit.EditOtherStaff();
    await caseEdit.saveCaseEdit();
    await caseEdit.verifyCaseEditSuccess();
});