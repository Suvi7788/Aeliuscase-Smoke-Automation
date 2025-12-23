const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ListUnassignedPage } = require("../../pages/documents/ListUnassignedPage");
const { DocumentPreviewComponent } = require("../../pages/documents/components/documentPreview.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Preview Documents', () => {
    test('Preview Unassigned Document', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate();
        const listUnassignedPage = new ListUnassignedPage(page);
        await listUnassignedPage.openFirstDocument("document","listUnassigned");
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await documentPreviewComponent.expectLoaded();
    });

    test('Preview Batchscan Document', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate();
        const listUnassignedPage = new ListUnassignedPage(page);
        await listUnassignedPage.openFirstDocument("document","listExtract");
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await documentPreviewComponent.expectLoaded();

    })
});