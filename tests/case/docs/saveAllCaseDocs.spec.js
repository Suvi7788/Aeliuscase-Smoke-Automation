const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../../pages/case/CaseDocsSection");
const { DocumentDownloadComponent } = require("../../../pages/documents/components/documentDownload.component");
const caseData = require("../../../data/caseData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Download Document', () => {
    test('Download Case Document', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseDocsSection = new CaseDocsSection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('documents');
        await caseDocsSection.selectDocType('Copy Service Request');
        await caseDocsSection.saveAllDocs();
        await caseDocsSection.verifySaveAllDocsSuccess();
    });

});