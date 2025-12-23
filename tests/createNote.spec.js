const { test } = require("@playwright/test");
const noteData = require("../data/noteData.json");
const { Menu } = require("../pages/Menu");
const { NoteForm } = require("../pages/components/NoteForm");
const { CaseDashboardSection } = require("../pages/sections/CaseDashboardSection");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");
const { CaseNoteListPage } = require("../pages/CaseNoteListPage");
const { caseListOptions } = require("../config/caseListOptions");
const { PartiesSection } = require("../pages/sections/PartiesSection");
const { CasePage } = require("../pages/CasePage");
test.describe('Create Note', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('Create Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Note From Case Note List', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        const menu = new Menu(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(noteData.caseNo);
        await caseOverview.caseTabs.open('notes');
        await caseNoteListPage.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseNoteListPage.verifyRecordCreation();
    })

    test('Create Quick Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openQuickNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Party Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openPartyNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Note From Case List', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const casePage = new CasePage(page);
        const menu = new Menu(page);
        await menu.navigate("case", "recentCases");
        await casePage.openCaseListOption(caseListOptions.composeNote);
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await casePage.verifyRecordCreation();
    })

    test('Create Party Note From Party Tab', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(noteData.caseNo);
        await partiesSection.openPartyNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.submitNoteForm();
        await partiesSection.verifyNoteCreation();
    })
})