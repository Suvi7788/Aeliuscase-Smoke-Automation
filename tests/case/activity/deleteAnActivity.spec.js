const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseOverviewPage } = require("../../../pages/CaseOverviewPage");
const { ActivitySection } = require("../../../pages/case/ActivitySection");
const { ActivityForm } = require("../../../pages/components/ActivityForm");
const caseData = require("../../../data/caseData.json");
const activityData = require("../../../data/activityData.json");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Delete an Activity', () => {
    test('Delete an Activity @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseOverview = new CaseOverviewPage(page);
        const activitySection = new ActivitySection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('activity');
        await activitySection.deleteActivityClick();
        await activitySection.deleteConfirm();
        await activitySection.verifyDeleteActivitySuccess();
    })
})
