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

test.describe('Edit Activity', () => {
    test('Edit Activity list Button Edit @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseOverview = new CaseOverviewPage(page);
        const activitySection = new ActivitySection(page);
        const activityForm = new ActivityForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('activity');
        await activitySection.editActivityBtnClick();
        await activityForm.editBtnClick();
        await activityForm.editActivity(activityData.updatedDescription);
        await activityForm.saveActivity();
        await activityForm.verifyEditActivitySuccess();
        
    })

    test('Edit Activity Options Edit @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseOverview = new CaseOverviewPage(page);
        const activitySection = new ActivitySection(page);
        const activityForm = new ActivityForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('activity');
        await activitySection.clickOptions();
        await activitySection.editActivityClick();
        await activityForm.editActivity(activityData.updatedDescription);
        await activityForm.saveActivity();
        await activityForm.verifyEditActivitySuccess();
        
    })
})
