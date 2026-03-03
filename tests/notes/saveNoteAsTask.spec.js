const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const noteData = require("../../data/noteData.json");
const { NoteForm } = require("../../pages/components/NoteForm");
const { CaseTabs } = require("../../pages/case/CaseTabs");




test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Save Note As Task', () => {
    test('Save Note As Task -Notes Tile-dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.fillAddTask();
        await noteForm.fillAssignee(noteData.AssigneeClick);
        await noteForm.assigneeClick();
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Save Note As Task -Notes List', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const caseTabs = new CaseTabs(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseTabs.open("notes");
        await caseDashboardSection.openNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.fillAddTask();
        await noteForm.fillAssignee(noteData.AssigneeClick);
        await noteForm.assigneeClick();
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Party Note as a task From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openPartyNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.fillAddTask();
        await noteForm.fillAssignee(noteData.AssigneeClick);
        await noteForm.assigneeClickCaseDashboard();
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })

    test('Create Quick Note From Case Dashboard', async ({ page }) => {
        const noteForm = new NoteForm(page);
        const caseDashboardSection = new CaseDashboardSection(page);
        const menu = new Menu(page);
        await menu.searchForCase(noteData.caseNo);
        await caseDashboardSection.openQuickNoteForm();
        await noteForm.fillNoteForm(noteData.Description);
        await noteForm.fillAddTask();
        await noteForm.fillAssignee(noteData.AssigneeClick);
        await noteForm.assigneeClickCaseDashboard();
        await noteForm.submitNoteForm();
        await caseDashboardSection.verifyRecordCreation();
    })
})
