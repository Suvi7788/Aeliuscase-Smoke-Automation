const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../../pages/case/CaseDocsSection");
const { DocumentUploadComponent } = require("../../../pages/documents/components/documentUpload.component");
const caseData = require("../../../data/caseData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Upload Case Docs', () => {
    test("Add Case Document @smoke", async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseDocsSection = new CaseDocsSection(page);
        const documentUpload = new DocumentUploadComponent(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('documents');
        await caseDocsSection.openAddDocsForm();
        await documentUpload.uploadDocument('tests/fixtures/test-document.pdf');
        await documentUpload.startUpload();
        await documentUpload.verifyCaseDocsUpload();
    });
})