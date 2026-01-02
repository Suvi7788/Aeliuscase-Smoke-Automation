const { test, expect } = require("@playwright/test");
const { FirmDashboardPage } = require("../pages/FirmDashboardPage");
const { CasePage } = require("../pages/CasePage");
const { caseTypes } = require("../config/caseTypes");

test.describe('Verify Dashboard Case List loads', () => {
    test('Verify Dashboard Case List loads', async ({ page }) => {
        const firmDashboardPage = new FirmDashboardPage(page);
        await firmDashboardPage.verifyCaseInTileList();
    })
})

// test.describe('Verify Recent Case List loads', () => {
//     test('Verify Recent Case List loads', async ({ page }) => {
//         const recentCasePage = new CasePage(page);
//         await recentCasePage.verifyCaseList(caseTypes.recent);
//     })
// })

test.describe("Case List Loading", () => {
  for (const type of Object.values(caseTypes)) {
    test(`Verify ${type} case list loads`, async ({ page }) => {
      const casePage = new CasePage(page);
      await casePage.verifyCaseList(type);
    });
  }
});