const { test } = require('@playwright/test');
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseNoteListPage } = require("../../../pages/CaseNoteListPage");
const { NoteForm } = require("../../../pages/components/NoteForm");

const caseData = require("../../../data/caseData.json");
const noteData = require("../../../data/noteData.json");
const { CaseDashboardSection } = require('../../../pages/case/CaseDashboardSection');


const settlementData = require("../../../data/settlementData.json");
const CaseSummarySection = require("../../../pages/case/CaseSummarySection");
const SettlementNotesSection = require("../../../pages/case/SettlementNotesSection");
const SettlementSection = require("../../../pages/case/SettlementSection");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Delete Note', () => {
    test('Delete Note from Note List @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseNoteListPage = new CaseNoteListPage(page);
        const noteForm = new NoteForm(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('notes');
        await caseNoteListPage.deleteNote();
        await caseNoteListPage.verifyDeleteNote();
    });

    test('Delete Note from Note Tile ', async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseDashboardSection.deleteNote();
        await caseDashboardSection.verifyDeleteNote();
    });
    test.describe('Delete Settlement Note', () => {
    test('Delete Settlement Note @smoke', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();
        await settlementSection.openSettlementNotes();
        const settlementNotesSection = new SettlementNotesSection(page);
        await settlementNotesSection.clickDelete();
        await settlementNotesSection.clickDeleteConfirm();
        await settlementNotesSection.verifyDeleteSettlementNoteSuccessMessage();
    })
})
});