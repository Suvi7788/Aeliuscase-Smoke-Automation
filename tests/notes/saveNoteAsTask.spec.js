const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { CaseDashboardSection } = require("../../pages/case/CaseDashboardSection");
const noteData = require("../../data/noteData.json");
const { NoteForm } = require("../../pages/components/NoteForm");



test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Save Note As Task', () => {
    test('Save Note As Task', async ({ page }) => {
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
})
