// tests/setup/verifyMessageInTileList.spec.js
const { test } = require("@playwright/test");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const eventData = require("../data/eventData.json");
const endpoints = require("../config/endpoints");
const { CaseNoteListPage } = require("../pages/CaseNoteListPage");


test.describe('Verify Note List loads', () => {
    test('Verify Case Note List loads', async ({ page }) => {
        const caseNoteListPage = new CaseNoteListPage(page);
        await caseNoteListPage.verifyNoteInCaseNoteList(eventData.caseId);
    })

    test('Verify Case Note Tile loads', async ({ page }) => {
        const caseDashboardPage = new CaseDashboardPage(page);
        await caseDashboardPage.verifyTilesLoadsInCaseDashboard(eventData.caseId, endpoints.GetCaseNote);
    })

    test('Verify Case Quick Note Tile loads', async ({ page }) => {
        const caseDashboardPage = new CaseDashboardPage(page);
        await caseDashboardPage.verifyTilesLoadsInCaseDashboard(eventData.caseId, endpoints.GetCaseNote);
    })
})
