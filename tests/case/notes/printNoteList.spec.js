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

test.describe('Print Settlement Note List', () => {
    test('Print Settlement Note List @smoke', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();
        await settlementSection.openSettlementNotes();
        const settlementNotesSection = new SettlementNotesSection(page);
        await settlementNotesSection.printNoteList();
        await settlementNotesSection.verifyPrintNoteList();
    })
    test('Print Negotiation Note List @smoke', async ({ page }) => {
        test.setTimeout(60000);
        const menu = new Menu(page);
        const caseSummarySection = new CaseSummarySection(page);
        const settlementSection = new SettlementSection(page);
        const settlementNotesSection = new SettlementNotesSection(page);
        await menu.searchForCase(settlementData.caseNo);
        await caseSummarySection.hoverOverInjuryDetails();
        await settlementSection.openNotHasSettlement();
        await settlementSection.openNegotiations();
        await settlementNotesSection.printNoteList();
        await settlementNotesSection.verifyPrintNoteList();
        
    })

})      