const { test } = require('@playwright/test');
const { Menu } = require("../../pages/Menu");
const { CreateDocumentTaskComponent } = require("../../pages/documents/components/createDocumentTask.component");
const taskData = require("../../data/taskData.json");
const { TaskForm } = require("../../pages/components/TaskForm");
const { AssignDocumentToCaseComponent } = require("../../pages/documents/components/assignDocumentToCase.component");
const documentData = require("../../data/documentData.json");

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.describe('Create Document Task', () => {

    //List Unassigned
    test('Create Document Task - List Unassigned', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listUnassigned");
        const createDocumentTaskComponent = new CreateDocumentTaskComponent(page);
        const taskForm = new TaskForm(page);
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await createDocumentTaskComponent.createDocumentTask();
        await createDocumentTaskComponent.verifyDocumentAttachedToTask();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await createDocumentTaskComponent.verifyTaskCreation();
    });

    //List Extract
    test('Create Document Task - List Extract', async ({ page }) => {
        const menu = new Menu(page);
        await menu.navigate("document", "listExtract");
        const createDocumentTaskComponent = new CreateDocumentTaskComponent(page);
        const taskForm = new TaskForm(page);
        const assignDocumentToCaseComponent = new AssignDocumentToCaseComponent(page);
        await assignDocumentToCaseComponent.assignDocumentToCase(documentData.caseNo);
        await createDocumentTaskComponent.createDocumentTask();
        await createDocumentTaskComponent.verifyDocumentAttachedToTask();
        await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
        await taskForm.submitTaskForm();
        await createDocumentTaskComponent.verifyTaskCreation();
    });

});
