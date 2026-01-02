const { EventForm } = require("./components/EventForm");
const { expect } = require('@playwright/test');
const { CaseCreationPage } = require("./CaseCreationPage");
const { MessageForm } = require("./components/MessageForm");
const { BasePage } = require('./BasePage');
const endpoints = require('../config/endpoints');
const routes = require('../config/routes');

class FirmDashboardPage extends BasePage {
    constructor(page) {
        super(page)
        const addEventBtn = "//button[@ptooltip='Create New Event']";
        const createCaseBtn = "//button[@ptooltip='Open a Case']";
        const addMessageBtn = "//button[@ptooltip='Create New Message']";
        const messageButton = "//tr[td[contains(., 'Normal') or contains(., 'High') or contains(., 'Low')]]//td[2]//button";
        const messageOption = "//tbody/tr[4]/td[2]/div[1]/div[1]/button[1]/span[1]";
        const viewMessageBtn = "//span[normalize-space()='View Message']";
        const viewMessageTitle = "div[class='p-toolbar-group-start'] span[class='header-title']"
        const editMessageBtn = "//span[normalize-space()='Edit Message']";
        const deleteMessageBtn = "//button[@ptooltip='Delete Message']//span[@class='p-button-icon pi pi-trash']";
        const deleteConfermationMsg = "//span[normalize-space()='Proceed']";        
        const msgPrintBtn ="//span[i[contains(@class,'pi-print')]]";


        this.page = page;
        this.AddEventBtn = page.locator(addEventBtn);
        this.createCaseBtn = page.locator(createCaseBtn);
        this.AddMessageBtn = page.locator(addMessageBtn);
        this.messageButton = this.page.locator(messageButton).first();
        this.messageOption = this.page.locator(messageOption).first();
        this.viewMessageBtn = this.page.locator(viewMessageBtn).first();
        this.viewMessageTitle = this.page.locator(viewMessageTitle).first();
        this.editMessageBtn = this.page.locator(editMessageBtn).first();
        this.deleteMessageBtn = this.page.locator(deleteMessageBtn).first();
        this.deleteConfermationMsg = this.page.locator(deleteConfermationMsg).first();
        this.msgPrintBtn = this.page.locator(msgPrintBtn).first();
        


        this.eventForm = new EventForm(page);
        this.caseCreationPage = new CaseCreationPage(page);
        this.messageForm = new MessageForm(page);

        // tasks
        const addTaskBtn = "//button[@ptooltip='Create New Task']";
        this.AddTaskBtn = page.locator(addTaskBtn);
        this.taskSubject = page.getByText('Test Automation Task - Subject').first();
        this.eventRow = page.locator('td').filter({ hasText: /Normal|High|Low/ }).first();

        //  event list verification selectors
        this.eventRow = page.locator('td').filter({ hasText: /Normal|High|Low/ }).first();
        this.taskSectionTitle = page.getByText('Upcoming Tasks (');
        this.eventSectionTitle = page.getByText('Upcoming Events (');
        this.messageSectionTitle = page.getByText('Messages', { exact: true });
        this.recentCasesTitle = page.locator('app-cases-dashboard').getByText('Recent Cases');

    }

    async openEventForm() {
        await this.AddEventBtn.click();
    }

    async createFirmDashboardEvent(caseNo, Subject, Assignee, Description, daysFromNow = 1) {
        // await this.page.waitForSelector(this.AddEventBtn);
        await this.openEventForm();
        await this.eventForm.fillEventForm(caseNo, Subject, Assignee, Description, daysFromNow);
        await this.eventForm.submitEventForm();
        await this.verifyEventCreation();
    }




    async verifyEventCreation() {
        // await this.waitForAPIResponse(endpoints.createEvent);
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Event added successfully.' })).toBeVisible();


    }



    async openCaseForm() {
        await this.createCaseBtn.click();
    }

    //Open Message Form
    async openMessageForm() {
        await this.AddMessageBtn.click();
    }

    //Create Firm Dashboard Message
    async createFirmDashboardMessage(caseNo, user, Details) {
        await this.openMessageForm();
        await this.messageForm.fillMessageForm(caseNo, user, Details);
        await this.messageForm.submitMessageForm();
    }

    //Verify Message and Task Creation
    async verifyMessageAndTaskCreation() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully created' })).toBeVisible();
    }

    async verifyTilesLoads(apiUrl) {
        await this.gotoAndWaitForAPI(routes.dashboard, apiUrl);
    }

    async verifyCaseInTileList() {
        await this.gotoAndWaitForAPI(routes.dashboard, endpoints.dashboardRecentCaseList);
    }

    async verifyMessageListLoads() {

        await this.gotoAndWaitForAPI(routes.dashboard, endpoints.getMessageTile);




        // Wait for message to appear in tile
        //await this.page.waitForTimeout(2000); // Allow time for refresh



        // Look for the message details in the tile
        // Adjust selector based on your actual HTML structure
        //await expect(this.messageButton).toBeVisible();

        console.log('✓ Message list loaded successfully in Message tile');
    }

    async verifyViewMessage() {

        await this.messageOption.click();
        await this.viewMessageBtn.click();
        await expect(this.viewMessageTitle).toBeVisible();
    }

    async openEditMessageForm() {
        await this.messageOption.click();
        await this.editMessageBtn.click();
    }
    // Tasks
    async openTaskForm() {
        await this.AddTaskBtn.click();
    }
 
    //Verify Print Button
    async verifyPrintButtonVisible() {
        await expect(this.msgPrintBtn).toBeVisible();
    }
    //Message Print
    async msgPrintviewPopup(){
        await this.msgPrintBtn.click();
    }


    async viewAddedTask() {
        await this.taskSubject.click();
    }

    async verifyRecordUpdate() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Record successfully updated' })).toBeVisible();
    }

    async navigateToTaskList() {
        await this.taskSectionTitle.click();
    }

    async navigateToEventList() {
        await this.eventSectionTitle.click();
    }

    async navigateToMessageList() {
        await this.messageSectionTitle.click();
    }
    async navigateToCaseList() {
        await this.recentCasesTitle.click();
    }
    
    async deleteMessage() {
        if (!await this.deleteMessageBtn.isVisible({ timeout: 3000 })) {
            throw new Error('Pre-condition failed: Test message not found');
        }
        await this.deleteMessageBtn.click();
        await this.deleteConfermationMsg.click(); 
    }
    
    async verifyDeleteMessage() {
        await expect(this.page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })).toBeVisible();
    }

}
module.exports = { FirmDashboardPage };
