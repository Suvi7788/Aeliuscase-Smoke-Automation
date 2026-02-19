const { test } = require('@playwright/test');
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseNoteListPage } = require("../../../pages/CaseNoteListPage");
const { NoteForm } = require("../../../pages/components/NoteForm");
const { CaseDashboardSection } = require('../../../pages/case/CaseDashboardSection');

const caseData = require("../../../data/caseData.json");
const noteData = require("../../../data/noteData.json");

const SettlementSection = require("../../../pages/case/SettlementSection");
const settlementData = require("../../../data/settlementData.json");
const CaseSummarySection = require("../../../pages/case/CaseSummarySection");
const SettlementNotesSection = require("../../../pages/case/SettlementNotesSection");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Edit Note', () => {
    test('Edit Note from Note List @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        const noteForm = new NoteForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('notes');
        await caseNoteListPage.navigateToEditNote();
        await noteForm.editNote(noteData.updatedDescription);
        await noteForm.submitNoteForm();
        await caseNoteListPage.verifyEditNote();
    });

    test('Edit Note from Note Tile ', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const noteForm = new NoteForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.navigateToEditNote();
        await noteForm.editNote(noteData.updatedDescription);
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyEditNote();
    });
    test('Update Settlement Note @smoke', async ({ page }) => {
        test.setTimeout(60000);
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();
        await settlementSection.openSettlementNotes();
        const noteForm = new NoteForm(page);
        const settlementNotesSection = new SettlementNotesSection(page);
        await settlementNotesSection.clickOptions(); // need to change this locator form devloper
        await settlementNotesSection.clickEdit();
        await noteForm.editNote(noteData.Description);
        await noteForm.submitNoteForm();
    })
});