const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const noteData = require("../../data/noteData.json");
const { CaseTabs } = require("../../pages/case/CaseTabs");
const { CaseNoteListPage } = require("../../pages/CaseNoteListPage");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Verify Note List Print', () => {
    test('Verify Note List Print', async ({ page }) => {
        test.setTimeout(60000);
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        await menu.searchForCase(noteData.caseNo);
        await caseTabs.open("notes");
        await caseNoteListPage.selectPeriodForPrint();
        await caseNoteListPage.selectThisWeekForPrint();
        //automated for this point the print is not working

    })
})
