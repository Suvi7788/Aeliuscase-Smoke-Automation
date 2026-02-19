const { test } = require('@playwright/test');
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseNoteListPage } = require("../../../pages/CaseNoteListPage");
const { NoteForm } = require("../../../pages/components/NoteForm");
const { CaseDashboardSection } = require('../../../pages/case/CaseDashboardSection');
const SettlementSection = require("../../../pages/case/SettlementSection");
const SettlementNotesSection = require("../../../pages/case/SettlementNotesSection");
const CaseSummarySection = require("../../../pages/case/CaseSummarySection");
const settlementData = require("../../../data/settlementData.json");
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
    
    test('View Settlement Note @smoke', async ({ page }) => {
        test.setTimeout(60000);
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openHasSettlement();
        await settlementSection.openSettlementNotes();
        const settlementNotesSection = new SettlementNotesSection(page);
        await settlementNotesSection.clickOptions(); // need to change this locator form devloper
        await settlementNotesSection.clickview();
        await settlementNotesSection.verifyViewNote();
    })

    test('View Negotiation Note @smoke', async ({ page }) => {
        test.setTimeout(60000);
        const menu = new Menu(page);
        await menu.searchForCase(settlementData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.hoverOverInjuryDetails();
        const settlementSection = new SettlementSection(page);
        await settlementSection.openNotHasSettlement();
        await settlementSection.openNegotiations();
        const settlementNotesSection = new SettlementNotesSection(page);
        await settlementNotesSection.clickOptions(); // need to change this locator form devloper
        await settlementNotesSection.clickview();
        await settlementNotesSection.verifyViewNote();
    })

});