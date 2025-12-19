const { test } = require("@playwright/test");
const { Menu } = require("../pages/Menu");
const eventData = require("../data/eventData.json");
const { CaseSummaryPage } = require("../pages/CaseSummaryPage");
const { ReferforVocationalServicesForm } = require("../pages/components/ReferforVocationalServicesForm");

test.describe('Case Summary', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    test('Referfor Vocational Services Form', async ({ page }) => {
        const menu = new Menu(page);
        await menu.searchForCase(eventData.caseNo); 
        const caseSummaryPage = new CaseSummaryPage(page);
        await caseSummaryPage.viewReferforVocationalServicesForm();
        const referforVocationalServicesForm = new ReferforVocationalServicesForm(page);
        await referforVocationalServicesForm.navigateToReferforVocationalServicesEditMode();
        await referforVocationalServicesForm.selectOtherOption();
        await referforVocationalServicesForm.verifyViewOpensCorrectFile();
        await referforVocationalServicesForm.deleteFile(); 
        await referforVocationalServicesForm.saveReferforVocationalServicesForm();       
    })
})




