// tests/setup/verifyMessageInTileList.spec.js
const { test } = require("@playwright/test");
const { CaseDashboardSection } = require("../../../pages/case/CaseDashboardSection");
const eventData = require("../../../data/eventData.json");
const endpoints = require("../../../config/endpoints");
const { CaseNoteListPage } = require("../../../pages/CaseNoteListPage");


test.describe('Verify Note List loads', () => {
    test('Verify Case Note List loads @smoke', async ({ page }) => {
        const caseNoteListPage = new CaseNoteListPage(page);
        await caseNoteListPage.verifyNoteInCaseNoteList(eventData.caseId);
    })

    test('Verify Case Note Tile loads @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        await caseDashboardSection.verifyTilesLoadsInCaseDashboard(eventData.caseId, endpoints.GetCaseNote);
    })

    test('Verify Case Quick Note Tile loads @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        await caseDashboardSection.verifyTilesLoadsInCaseDashboard(eventData.caseId, endpoints.GetCaseNote);
    })

    test('Verify Case settlement Note list loads @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        await caseDashboardSection.verifySettlementNoteList(eventData.caseId, endpoints.GetCaseNote);
    })

    test('Verify Case Negotiation Note list loads @smoke', async ({ page }) => {
        const caseDashboardSection = new CaseDashboardSection(page);
        await caseDashboardSection.verifyNegotiationNoteList(eventData.caseId, endpoints.GetCaseNote);
    })

})
