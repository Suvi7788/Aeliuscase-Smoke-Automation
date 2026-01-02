const { test } = require('@playwright/test');
const { DocumentActionsPage } = require('../../pages/documents/components/documentActions.component');
const { Menu } = require('../../pages/Menu');
const documentData = require('../../data/documentData.json');
const taskData = require("../../data/taskData.json");
const { TaskForm } = require("../../pages/components/TaskForm");

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});

//Document Unassigned
test.describe('Bulk Actions Document Unassigned', () => {
  test('Bulk action- Delete Document Unassigned', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    await menu.navigate("document", "listUnassigned");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Delete');
    await documentActionsPage.confirmDeleteDocument();
    await documentActionsPage.verifyToastContains('deleted successfully');
  });

  test('Bulk action- Assign Document Unassigned', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    await menu.navigate("document", "listUnassigned");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Assign');
    await documentActionsPage.assignDocumentToCase(documentData.caseNo);
    await documentActionsPage.saveDocument();
    // await documentActionsPage.verifyToastContains('assigned successfully');
  });

  test('Bulk assign- Create Document Task', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    const taskForm = new TaskForm(page);
    await menu.navigate("document", "listUnassigned");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Create Task');
    await documentActionsPage.verifyDocumentAttachedToTask();
    await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
    await taskForm.submitTaskForm();
    await documentActionsPage.verifyToastContains('Record successfully created');
  })
});





//List Extract
test.describe('Bulk Actions Document Extract', () => {
  test('Bulk action- Delete Document Unassigned', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    await menu.navigate("document", "listExtract");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Delete');
    await documentActionsPage.confirmDeleteDocument();
    await documentActionsPage.verifyToastContains('deleted successfully');
  });

  test('Bulk action- Assign Document Unassigned', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    await menu.navigate("document", "listExtract");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Assign');
    await documentActionsPage.assignDocumentToCase(documentData.caseNo);
    await documentActionsPage.saveDocument();
    // await documentActionsPage.verifyToastContains('assigned successfully');
  });

  test('Bulk assign- Create Document Task', async ({ page }) => {
    const documentActionsPage = new DocumentActionsPage(page);
    const menu = new Menu(page);
    const taskForm = new TaskForm(page);
    await menu.navigate("document", "listExtract");
    await documentActionsPage.selectFirstNRows();
    await documentActionsPage.verifyBulkActionsVisible();
    await documentActionsPage.selectBulkAction('Create Task');
    await documentActionsPage.verifyDocumentAttachedToTask();
    await taskForm.fillTaskForm(taskData.caseNo, taskData.Subject, taskData.Assignee, taskData.Description);
    await taskForm.submitTaskForm();
    await documentActionsPage.verifyToastContains('Record successfully created');
  })
});
