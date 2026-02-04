const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { FillDocumentInfoComponent } = require("../../../pages/documents/components/fillDocumentInfo.component");
const documentData = require("../../../data/documentData.json");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../../pages/case/CaseDocsSection");
const caseData = require("../../../data/caseData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Merge Document', () => {
    test('Merge Case Document', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseDocsSection = new CaseDocsSection(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('documents');
        await caseDocsSection.selectDocuments();
        await caseDocsSection.mergeDocuments();
        await caseDocsSection.verifyMergeDocumentSuccess();
    });
});