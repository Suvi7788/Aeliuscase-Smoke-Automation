const { test } = require("@playwright/test");
const { PartiesSection } = require("../pages/case/PartiesSection");
const partyData = require("../data/partyData.json");
const { Menu } = require("../pages/Menu");
const eventData = require("../data/eventData.json");
const { PartyForm } = require("../pages/components/PartyForm");
const { CaseOverviewPage } = require("../pages/CaseOverviewPage");
const { CaseDashboardSection } = require("../pages/case/CaseDashboardSection");
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
            const partiesSection = new PartiesSection(page);
            const partyForm = new PartyForm(page);
            const caseOverview = new CaseOverviewPage(page);
            await menu.searchForCase(eventData.caseNo);
            await caseOverview.caseTabs.open('parties');
            await partiesSection.openPartyForm();
            await partiesSection.selectPartyType(tc.type);
            await partyForm.fillPartyForm(partyData.companyName);
            await partyForm.savePartyForm();
            await partiesSection.verifyPartyCreation();
        })
    }

    for (const tc of testCases) {
        test(`Update ${tc.name} Party`, async ({ page }) => {
            const menu = new Menu(page);
            const partiesSection = new PartiesSection(page);
            const partyForm = new PartyForm(page);
            const caseOverview = new CaseOverviewPage(page);
            await menu.searchForCase(eventData.caseNo);
            await caseOverview.caseTabs.open('parties');
            await partiesSection.openCreatedParty(tc.type);
            await partyForm.navigateToEditParty();
            await partyForm.updatePartyForm(partyData.comments);
            await partyForm.savePartyForm();
            await partiesSection.verifyPartyUpdate();
        })
    }

    for (const tc of testCases) {
        test(`Delete ${tc.name} Party`, async ({ page }) => {
            const menu = new Menu(page);
            const partiesSection = new PartiesSection(page);
            const caseOverview = new CaseOverviewPage(page);
            await menu.searchForCase(eventData.caseNo);
            await caseOverview.caseTabs.open('parties');
            await partiesSection.deleteParty(tc.type);
        })
    }

    test(`Update Employer Party From Parties Tab`, async ({ page }) => {
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const partyForm = new PartyForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('parties');
        await partiesSection.openCreatedParty('Employer (P)');
        await partyForm.navigateToEditParty();
        await partyForm.updatePartyForm(partyData.comments);
        await partyForm.savePartyForm();
        await partiesSection.verifyEmployerApplicantUpdate('Employer');
    })

    test(`Update Applicant Party From Parties Tab`, async ({ page }) => {
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const partyForm = new PartyForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('parties');
        await partiesSection.openCreatedParty('Applicant');
        await partyForm.navigateToEditParty();
        await partyForm.updateApplicantAddress(partyData.comments);
        await partyForm.savePartyForm();
        await partiesSection.verifyEmployerApplicantUpdate('Applicant');
    })

    test(`Add Prior Treatment Providers`, async ({ page }) => {
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const partyForm = new PartyForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('parties');
        await partiesSection.openCreatedParty('Applicant');
        await partyForm.navigateToEditParty();
        await partyForm.openAddPriorTreatmentProviderForm();
        await partyForm.fillPriorTreatmentForm(partyData.companyName, partyData.doctorName);
        await partyForm.savePriorTreatmentForm();

    })

    test(`Update Prior Treatment Providers`, async ({ page }) => {
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const partyForm = new PartyForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('parties');
        await partiesSection.openCreatedParty('Applicant');
        await partyForm.navigateToEditParty();
        await partyForm.navigateToEditPriorTreatment();
        await partyForm.updatePartyForm(partyData.comments);
        await partyForm.savePriorTreatmentForm();
        await partiesSection.verifyPartyUpdate();
    })

    test(`Delete Prior Treatment Providers`, async ({ page }) => {
        const menu = new Menu(page);
        const partiesSection = new PartiesSection(page);
        const partyForm = new PartyForm(page);
        const caseOverview = new CaseOverviewPage(page);
        await menu.searchForCase(eventData.caseNo);
        await caseOverview.caseTabs.open('parties');
        await partiesSection.openCreatedParty('Applicant');
        await partyForm.navigateToEditParty();
        await partyForm.deletePriorTreatmentProvider();
        await partiesSection.verifyPriorTreatmentDeletion();
    })

    test(`Update Employer Party From Case Dashboard`, async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const partyForm = new PartyForm(page);
        await menu.searchForCase(eventData.caseNo);
        await caseDashboardSection.openCreatedParty('Employer (P)');
        await caseDashboardSection.navigateToEditParty();
        await partyForm.updatePartyForm(partyData.comments);
        await partyForm.savePartyForm();
        await caseDashboardSection.verifyEmployerApplicantUpdate('Employer');
    })

    test(`Update Applicant Party From Case Dashboard`, async ({ page }) => {
        const menu = new Menu(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const partyForm = new PartyForm(page);
        await menu.searchForCase(eventData.caseNo);
        await caseDashboardSection.openCreatedParty('Applicant');
        await caseDashboardSection.navigateToEditParty();
        await partyForm.updateApplicantAddress(partyData.comments);
        await partyForm.savePartyForm();
        await caseDashboardSection.verifyEmployerApplicantUpdate('Applicant');
    })

})