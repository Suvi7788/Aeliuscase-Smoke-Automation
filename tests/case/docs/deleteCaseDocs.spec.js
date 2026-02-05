const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../../pages/case/CaseDocsSection");
const { DocumentDownloadComponent } = require("../../../pages/documents/components/documentDownload.component");
const caseData = require("../../../data/caseData.json");
const { DeleteDocumentComponent } = require("../../../pages/documents/components/deleteDocument.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Delete Document', () => {
    test('Delete Case Document @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseDocsSection = new CaseDocsSection(page);
        const deleteDocumentComponent = new DeleteDocumentComponent(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('documents');
        await deleteDocumentComponent.deleteDocument();
        await deleteDocumentComponent.verifyDocumentDeleteSuccess();
    });

});