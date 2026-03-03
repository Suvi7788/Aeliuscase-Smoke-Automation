const { test } = require("@playwright/test");
const { RolodexPage } = require("../../pages/rolodex/RolodexPage");
const partyData = require("../../data/partyData.json");
const { Menu } = require("../../pages/Menu");
const {PartiesSection} = require("../../pages/case/PartiesSection");
const {PartyForm} = require("../../pages/components/PartyForm");

test.describe('Edit Rolodex Company', () => {
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
        test('View Rolodex Company', async ({ page }) => {
            const rolodexPage = new RolodexPage(page);
            const partiesSection = new PartiesSection(page);
            const partyForm = new PartyForm(page);
            const menu = new Menu(page);
            await menu.openMenu('rolodex');
            await rolodexPage.filterByTypeClick();
            await rolodexPage.filterByTypeOptionSelectCompanyClick();
            await rolodexPage.option();
            await rolodexPage.view();
            await rolodexPage.viewVerifyCompany();
            
        });
    } 
});
