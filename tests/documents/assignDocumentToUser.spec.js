const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { AssignDocumentToCaseComponent } = require("../../pages/documents/components/assignDocumentToCase.component");
const documentData = require("../../data/documentData.json");
const { AssignDocumentToUserComponent } = require("../../pages/documents/components/assignDocumentToUser.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

//need to add selectors to notify field
test.describe('Assign Document To User', () => {
    test.skip('Assign Unassigned Document To User', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        const assignDocumentToUserComponent = new AssignDocumentToUserComponent(page);
        await assignDocumentToUserComponent.assignDocumentToUser();
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await assignDocumentToCaseComponent.saveDocument();
        await assignDocumentToCaseComponent.verifySaveSuccess();
    });


    test.skip('Assign Batchscan Document To User', async({ page }) => {
         const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        const assignDocumentToUserComponent = new AssignDocumentToUserComponent(page);
        await assignDocumentToUserComponent.assignDocumentToUser();
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await assignDocumentToCaseComponent.saveDocument();
        await assignDocumentToCaseComponent.verifySaveSuccess();
    })
});
