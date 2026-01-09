const { test } = require("@playwright/test");
const { RolodexPage } = require("../../pages/rolodex/RolodexPage");
const partyData = require("../../data/partyData.json");
const { Menu } = require("../../pages/Menu");
const {partiesSection} = require("../../pages/case/PartiesSection");

test.describe('Add Rolodex Company', () => {
    const testCases = [
        // { name: 'Medical Provider', type: partyData.medicalProvider },
        // { name: 'Defense Attorney', type: partyData.defenseAttorney },
        // { name: 'Insurance Carrier', type: partyData.insuranceCarrier },
        { name: 'Attorney', type: partyData.attorney },


    ];

    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    for (const tc of testCases) {
        test(`Add ${tc.name} Company`, async ({ page }) => {
            const rolodexPage = new RolodexPage(page);
            const menu = new Menu(page);
            await menu.openMenu('rolodex');
            await rolodexPage.openAddCompanyForm();
            await partiesSection.selectPartyType(tc.type);
            await partyForm.fillPartyForm(partyData.companyName);
            await partyForm.savePartyForm();
            await partiesSection.verifyPartyCreation();
        });
    }
});
