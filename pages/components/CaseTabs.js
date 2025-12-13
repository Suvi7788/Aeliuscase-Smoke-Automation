const { expect } = require("@playwright/test");
class CaseTabs {
    constructor(page) {
        this.page = page;
        this.EventListTab = this.page.getByRole('tab', { name: 'Calendar' });
        this.TaskListTab = this.page.getByRole('tab', { name: 'Tasks' });
        this.NoteListTab = this.page.getByRole('tab', { name: 'Notes' });

        //Locators to validate case list option navigation
        this.NoteSectionLocator = this.page.getByRole('textbox', { name: 'Search Notes' });
        this.DocumentSectionLocator = this.page.getByRole('textbox', { name: 'Search Documents' });
        this.CalendarSectionLocator = this.page.getByText('Calendar View', { exact: true });
        this.ActivitySectionLocator = this.page.getByRole('textbox', { name: 'Search Activity' });
        this.LetterSectionLocator = this.page.getByRole('textbox', { name: 'Search Letters' });

        this.NoteTabRoute = "tab=2";
        this.DocumentTabRoute = "tab=3";
        this.CalendarTabRoute = "tab=4";
        this.ActivityTabRoute = "tab=7";
        this.LetterTabRoute = "tab=10";
    }

    async navigateToCaseEventList() {
        await this.EventListTab.click();
    }

    async navigateToCaseTaskList() {
        await this.TaskListTab.click();
    }

    async navigateToCaseNoteList() {
        await this.NoteListTab.click();
    }

    async verifyCaseTabNavigation(tabLocator) {
        await expect(tabLocator).toBeVisible();
    }

    async verifyCaseTabRoute(tabRoute) {
        await expect(this.page.url()).toContain(tabRoute);
    }
}
module.exports = { CaseTabs };