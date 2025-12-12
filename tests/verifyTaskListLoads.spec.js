// tests/setup/verifyMessageInTileList.spec.js
const { test, expect } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { FirmTaskListPage } = require("../pages/FirmTaskListPage");
const { CaseTaskListPage } = require("../pages/CaseTaskListPage");
const { CaseDashboardPage } = require("../pages/CaseDashboardPage");
const taskData = require("../data/taskData.json");
const endpoints = require("../config/endpoints");

test.describe('Verify Task list loads', () => {

    test('Verify Firm Dashboard Task Tile loads', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyTilesLoads(endpoints.GetTaskTile);
    })
    test('Verify Firm Task List loads', async ({ page }) => {
        const firmTaskListPage = new FirmTaskListPage(page);
        await firmTaskListPage.verifyTaskInTaskList();
    })
    test('Verify Case Dashboard Task Tile loads', async ({ page }) => {
        const caseDashboardPage = new CaseDashboardPage(page);
        await caseDashboardPage.verifyTilesLoadsInCaseDashboard(taskData.caseId, endpoints.GetTaskTile);
    })
    test('Verify Case Task List loads', async ({ page }) => {
        const caseTaskListPage = new CaseTaskListPage(page);
        await caseTaskListPage.verifyTaskInTaskList(taskData.caseId);
    })



})
