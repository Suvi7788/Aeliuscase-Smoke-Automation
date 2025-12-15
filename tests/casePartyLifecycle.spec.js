const { test } = require("@playwright/test");
const { PartiesPage } = require("../pages/PartiesPage");
const partyData = require("../data/partyData.json");
const { Menu } = require("../pages/Menu");
const eventData = require("../data/eventData.json");
const { PartyForm } = require("../pages/components/PartyForm");
const { CaseTabs } = require("../pages/components/CaseTabs");

test.describe('Create Party', () => {

    const testCases = [
        { name: 'Medical Provider', type: partyData.medicalProvider },
        { name: 'Defense Attorney', type: partyData.defenseAttorney },
        { name: 'Insurance Carrier', type: partyData.insuranceCarrier },
        { name: 'Claims Administrator', type: partyData.claimsAdministrator },


    ];

    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });
    for (const tc of testCases) {
        test(`Create ${tc.name} Party`, async ({ page }) => {
            const menu = new Menu(page);
            const partiesPage = new PartiesPage(page);
            const partyForm = new PartyForm(page);
            const caseTabs = new CaseTabs(page);
            await menu.searchForCase(eventData.caseNo);
            await caseTabs.navigateToCasePartiesTab();
            await partiesPage.openPartyForm();
            await partiesPage.selectPartyType(tc.type);
            await partyForm.fillPartyForm(partyData.companyName);
            await partyForm.savePartyForm();
            await partiesPage.verifyRecordCreation();
        })
    }

    for (const tc of testCases) {
        test(`Update ${tc.name} Party`, async ({ page }) => {
            const menu = new Menu(page);
            const partiesPage = new PartiesPage(page);
            const partyForm = new PartyForm(page);
            const caseTabs = new CaseTabs(page);
            await menu.searchForCase(eventData.caseNo);
            await caseTabs.navigateToCasePartiesTab();
            await partiesPage.openCreatedParty(tc.type);
            await partiesPage.navigateToEditParty();
            await partyForm.updatePartyForm(partyData.comments);
            await partyForm.savePartyForm();
            await partiesPage.verifyRecordUpdate();
        })
    }

    for (const tc of testCases) {
        test(`Delete ${tc.name} Party`, async ({ page }) => {
            const menu = new Menu(page);
            const partiesPage = new PartiesPage(page);
            const caseTabs = new CaseTabs(page);
            await menu.searchForCase(eventData.caseNo);
            await caseTabs.navigateToCasePartiesTab();
            await partiesPage.deleteParty(tc.type);
        })
    }


})