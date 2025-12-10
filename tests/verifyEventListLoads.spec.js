// tests/setup/verifyMessageInTileList.spec.js
const { test, expect } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { FirmEventListPage } = require("../pages/FirmEventListPage");
const { CaseEventListPage } = require("../pages/CaseEventListPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");

test.describe('Verify Event Tile list loads', () => {
    test('Verify Event Tile list loads', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyEventInTileList();
    })
})

test.describe('Verify Firm Event List loads', () => {
    test('Verify Firm Event List loads', async ({ page }) => {
        const firmEventListPage = new FirmEventListPage(page);
        await firmEventListPage.verifyEventInEventList();
    })
})

test.describe('Verify Case Event List loads', () => {
    test('Verify Case Event List loads', async ({ page }) => {
        const caseEventListPage = new CaseEventListPage(page);
        await caseEventListPage.verifyEventInCaseEventList();
    })
})

test.describe('Verify Case Event Tile loads', () => {
    test('Verify Case Event Tile loads', async ({ page }) => {
        const caseDashboardPage = new CaseDashboardPage(page);
        await caseDashboardPage.verifyEventInCaseEventTile();
    })
})
