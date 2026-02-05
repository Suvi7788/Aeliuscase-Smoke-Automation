const { test } = require("@playwright/test");
const { Menu } = require("../../../pages/Menu");
const { CaseTabs } = require("../../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../../pages/case/CaseDocsSection");
const { DocumentPreviewComponent } = require("../../../pages/documents/components/documentPreview.component");
const caseData = require("../../../data/caseData.json");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Preview Documents', () => {
    test('Preview Case Document @smoke', async ({ page }) => {
        const menu = new Menu(page);
        const caseTabs = new CaseTabs(page);
        const caseDocsSection = new CaseDocsSection(page);
        const documentPreviewComponent = new DocumentPreviewComponent(page);
        await menu.searchForCase(caseData.caseNo);
        await caseTabs.open('documents');
        await caseDocsSection.openFirstDocument();
        await documentPreviewComponent.expectLoaded(true);
    });
});