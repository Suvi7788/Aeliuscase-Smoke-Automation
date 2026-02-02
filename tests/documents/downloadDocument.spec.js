const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ListUnassignedPage } = require("../../pages/documents/ListUnassignedPage");
const { DocumentDownloadComponent } = require("../../pages/documents/components/documentDownload.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Download Document', () => {
    test('Download Unassigned Document', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const documentDownloadComponent = new DocumentDownloadComponent(page);
        await documentDownloadComponent.downloadDocument();
    });

    test('Download Batchscan Document', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const documentDownloadComponent = new DocumentDownloadComponent(page);
        await documentDownloadComponent.downloadDocument();
    })
});