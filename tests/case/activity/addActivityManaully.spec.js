const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const {CaseDashboardSection} = require("../../../pages/case/CaseDashboardSection");
const caseData = require("../../../data/caseData.json");
const {ActivityForm} = require("../../../pages/components/ActivityForm");
const {ActivitySection }= require("../../../pages/case/activitySection");
const {CaseTabs} = require("../../../pages/case/CaseTabs");
const {CaseOverviewPage} = require("../../../pages/CaseOverviewPage");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Add Activity Manually', () => {
    test('Add Activity Manually @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(caseData.caseNo);
        await caseOverview.caseTabs.open('activity');
        const activitySection = new ActivitySection(page);
        await activitySection.addNewActivity();
        const activityForm = new ActivityForm(page);
        await activityForm.selectActivityType();
        await activityForm.selectActivityTypeClick();
        await activityForm.saveActivity();
    })
})