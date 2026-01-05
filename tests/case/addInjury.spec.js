const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const eventData = require("../../data/eventData.json");
const CaseInjurySection = require("../../pages/case/CaseInjurySection");
const injuryData = require("../../data/injuryData.json");
const { CaseTabs } = require("../../pages/case/CaseTabs");

test.describe('Add Injury', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test(`Add Injury`, async ({ page }) => {
        const menu = new Menu(page);
        const injurySection = new CaseInjurySection(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(eventData.caseNo);
        await caseTabs.open("injury");
        await injurySection.openAddNewInjuryForm();
        await injurySection.fillAddNewInjuryForm(injuryData.doi);
        await injurySection.saveInjuryDescription();
        await injurySection.verifyInjuryUpdate();
    })
})