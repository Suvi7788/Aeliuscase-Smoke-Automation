const { test } = require("@playwright/test");
const SettlementSection = require("../../../pages/case/SettlementSection");
const settlementData = require("../../../data/settlementData.json");
const { Menu } = require("../../../pages/Menu");
const CaseSummarySection = require("../../../pages/case/CaseSummarySection");
const noteData = require("../../../data/noteData.json");
const SettlementNotesSection = require("../../../pages/case/SettlementNotesSection");
const { NoteForm } = require("../../../pages/components/NoteForm");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
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
        await settlementNotesSection.printSettlementNoteList();
        await settlementNotesSection.verifyPrintSettlementNoteList();
    })
})      