const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const eventData = require("../../data/eventData.json");
const CaseInjurySection = require("../../pages/case/CaseInjurySection");
const injuryData = require("../../data/injuryData.json");
const { CaseTabs } = require("../../pages/case/CaseTabs");

test.describe('Update Injury', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test(`Update Injury`, async ({ page }) => {
        const menu = new Menu(page);
        const injurySection = new CaseInjurySection(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(eventData.caseNo);
        await caseTabs.open("injury");
        await injurySection.navigateToEditInjury();
        await injurySection.updateInjuryDescription(injuryData.editedDescription);
        await injurySection.saveInjuryDescription();
        await injurySection.verifyInjuryUpdate();
    })
})