const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ListUnassignedPage } = require("../../pages/documents/ListUnassignedPage");
const { DocumentPreviewComponent } = require("../../pages/documents/components/documentPreview.component");
const caseData = require("../../data/caseData.json");
const { CaseTabs } = require("../../pages/case/CaseTabs");
test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Preview Documents', () => {
    test('Preview Unassigned Document', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document","listUnassigned");
        const listUnassignedPage = new ListUnassignedPage(page);
        await listUnassignedPage.openFirstDocument("document","listUnassigned");
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await documentPreviewComponent.expectLoaded();
    });

    test('Preview Batchscan Document', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document","listExtract");
        const listUnassignedPage = new ListUnassignedPage(page);
        await listUnassignedPage.openFirstDocument("document","listExtract");
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await documentPreviewComponent.expectLoaded();

    })

    test('Preview Case Document', async({ page }) => {
         const menu = new Menu(page);
        await menu.searchForCase(caseData.caseNo);
        const caseTabs = new CaseTabs(page);
        await caseTabs.open('documents');
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await documentPreviewComponent.expectLoaded();

    })
});