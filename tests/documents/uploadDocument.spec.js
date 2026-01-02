const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ListUnassignedPage } = require("../../pages/documents/ListUnassignedPage");
const { DocumentUploadComponent } = require("../../pages/documents/components/documentUpload.component");
const routes = require("../../config/routes");

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
})