const { test } = require('@playwright/test');
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseNoteListPage } = require("../../../pages/CaseNoteListPage");
const { NoteForm } = require("../../../pages/components/NoteForm");
const { CaseDashboardSection } = require('../../../pages/case/CaseDashboardSection');

const caseData = require("../../../data/caseData.json");
test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('View Note', () => {
    test('View Note @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        const noteForm = new NoteForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('notes');
        await caseNoteListPage.viewNote();
        await noteForm.verifyNoteView();
    });

    test('View Note from Note Tile ', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const noteForm = new NoteForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.viewNote();
        await noteForm.verifyNoteView();
    });
});