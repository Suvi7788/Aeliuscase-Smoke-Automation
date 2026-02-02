const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { AssignDocumentToCaseComponent } = require("../../pages/documents/components/assignDocumentToCase.component");
const documentData = require("../../data/documentData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Assign Document To Case', () => {
    test('Assign Unassigned Document To Case', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await assignDocumentToCaseComponent.saveDocument();
        await assignDocumentToCaseComponent.verifySaveSuccess();
    });


    test('Assign Batchscan Document To Case', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await assignDocumentToCaseComponent.saveDocument();
        await assignDocumentToCaseComponent.verifySaveSuccess();
    })
});