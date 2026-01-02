const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { FillDocumentInfoComponent } = require("../../pages/documents/components/fillDocumentInfo.component");
const documentData = require("../../data/documentData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Fill Document Info', () => {
    test.only('Fill Unassigned Document Info', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const fillDocumentInfoComponent = new FillDocumentInfoComponent(page);
        await fillDocumentInfoComponent.fillDocumentInfo(documentData.caseNo, documentData.details);
        await fillDocumentInfoComponent.verifySaveSuccess();
    });


    //need to chnage the type,category,subcategory locators
    test('Fill Batchscan Document Info', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const fillDocumentInfoComponent = new FillDocumentInfoComponent(page);
        await fillDocumentInfoComponent.fillDocumentInfo(documentData.caseNo, documentData.details);
        await fillDocumentInfoComponent.verifySaveSuccess();
    })
});