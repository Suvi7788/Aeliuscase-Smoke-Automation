const { test } = require("@playwright/test");
const { Menu } = require("../pages/Menu");
const caseData = require("../data/caseData.json");
const { CaseSummarySection } = require("../pages/case/CaseSummarySection");
const { ReferforVocationalServicesForm } = require("../pages/components/ReferforVocationalServicesForm");

test.describe('Case Summary', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Referfor Vocational Services Form Edits', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(caseData.caseNo);
        const caseSummarySection = new CaseSummarySection(page);
        await caseSummarySection.viewReferforVocationalServicesForm();
        const referforVocationalServicesForm = new ReferforVocationalServicesForm(page);
        await referforVocationalServicesForm.navigateToReferforVocationalServicesEditMode();
        await referforVocationalServicesForm.selectOtherOption();
        await referforVocationalServicesForm.uploadDocument('tests/fixtures/test-document.pdf');
        await referforVocationalServicesForm.verifyViewOpensCorrectFile();
        await referforVocationalServicesForm.deleteFile();
        await referforVocationalServicesForm.saveReferforVocationalServicesForm();
    })
})




