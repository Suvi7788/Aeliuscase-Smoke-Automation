const { test } = require("@playwright/test");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const { Menu } = require("../../pages/Menu");
const { CaseTabs } = require("../../pages/case/CaseTabs");
const { CaseDocsSection } = require("../../pages/case/CaseDocsSection");
const caseData = require("../../data/caseData.json");
const DocumentUploadComponent = require("../../pages/documents/components/documentUpload.component");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test("Add Case Document", async ({ page }) => {
    const menu = new Menu(page);
    const caseTabs = new CaseTabs(page);
    const caseDocsSection = new CaseDocsSection(page);
    const documentUpload = new DocumentUploadComponent(page);
    await menu.searchForCase(caseData.caseNo);
    await caseTabs.open('documents');
    await caseDocsSection.openAddDocsForm();
    await documentUpload.uploadDocument('tests/fixtures/testUnassigned.pdf');
    await documentUpload.startUpload();
});