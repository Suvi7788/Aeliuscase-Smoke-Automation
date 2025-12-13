const { test } = require("@playwright/test");
const noteData = require("../data/noteData.json");
const { Menu } = require("../pages/Menu");
const { NoteForm } = require("../pages/components/NoteForm");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const { CaseTabs } = require("../pages/components/CaseTabs");
const { CaseNoteListPage } = require("../pages/CaseNoteListPage");
const { CasePage } = require("../pages/CasePage");
const { caseListOptions } = require("../config/caseListOptions");

test.describe('Create Note', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test.skip('Create Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardPage.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardPage.verifyRecordCreation();
    })

    test.skip('Create Note From Case Note List', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        await menu.searchForCase(noteData.caseNo);
        await caseTabs.navigateToCaseNoteList();
        await caseNoteListPage.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseNoteListPage.verifyRecordCreation();
    })

    test.skip('Create Quick Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardPage.openQuickNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardPage.verifyRecordCreation();
    })

    test.skip('Create Party Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardPage = new CaseDashboardPage(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardPage.openPartyNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardPage.verifyRecordCreation();
    })

    test('Create Note From Case List', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const casePage = new CasePage(page);
        const menu = new Menu(page);
        await menu.navigateToRecentCase();
        await casePage.openCaseListOption(caseListOptions.composeNote);
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await casePage.verifyRecordCreation();
    })
})