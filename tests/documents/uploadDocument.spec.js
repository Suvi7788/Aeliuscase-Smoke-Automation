const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ListUnassignedPage } = require("../../pages/documents/ListUnassignedPage");
const { DocumentUploadComponent } = require("../../pages/documents/components/documentUpload.component");
const routes = require("../../config/routes");
const caseData = require("../../data/caseData.json");
const { CaseTabs } = require("../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../pages/case/CaseDocsSection");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Upload Document', () => {
    test('Upload Document Unassigned', async ({ page }) => {
        const listUnassignedPage = new ListUnassignedPage(page);
        const menu = new Menu(page);
        const documentUpload = new DocumentUploadComponent(page);
        await menu.navigate("document", "uploadUnassigned");
        await documentUpload.uploadDocument('tests/fixtures/testUnassigned.pdf');
        await documentUpload.startUpload();
        await documentUpload.verifyUploadNavigation(routes.listUnassigned);
    })

    test('Upload Document Batchscan', async ({ page }) => {
        const documentUpload = new DocumentUploadComponent(page);
        const menu = new Menu(page);
        await menu.navigate("document", "uploadBatchscan");
        await documentUpload.uploadDocument('tests/fixtures/testBatchscan.pdf');
        await documentUpload.verifyUploadSuccessMessage();
        await documentUpload.scanDocument();
        await documentUpload.verifyScanCompleted();
        await documentUpload.verifyUploadNavigation(routes.listBatchscan);
    })
    test("Add Case Document", async ({ page }) => {
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