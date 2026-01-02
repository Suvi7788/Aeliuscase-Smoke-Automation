const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { DeleteDocumentComponent } = require("../../pages/documents/components/deleteDocument.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Delete Document', () => {
    test('Delete Unassigned Document', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const deleteDocumentComponent = new DeleteDocumentComponent(page);
        await deleteDocumentComponent.deleteDocument();
        await deleteDocumentComponent.verifyDocumentDeleteSuccess();
    });

    test('Delete Batchscan Document', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const deleteDocumentComponent = new DeleteDocumentComponent(page);
        await deleteDocumentComponent.deleteDocument();
        await deleteDocumentComponent.verifyBatchScanDeleteSuccess();
    })
});