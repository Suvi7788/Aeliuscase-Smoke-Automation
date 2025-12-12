class Menu {
    constructor(page) {
        this.page = page;
        //Calendar Locators
        this.CalendarMenu = page.locator('span.menubar-custom-label', { hasText: 'Calendar' }).first();
        this.FirmEventListMenu = page.locator('[id="74"] a').filter({ hasText: 'List' });
        //case locator
        this.CaseMenu = page.locator('span.menubar-custom-label', { hasText: 'Case' }).first();
        this.RecentCaseMenu = page.locator('a').filter({ hasText: 'Recent Cases' });

        //Task locator
        this.TaskMenu = page.locator('span.menubar-custom-label', { hasText: 'Task' }).first();
        this.FirmTaskListMenu = page.locator('a').filter({ hasText: 'Tasks Inbox' });
    }
    async searchForCase(caseNo) {
        await this.page.locator('input.p-autocomplete-input[placeholder="Search"]').fill(caseNo);
        await this.page.getByRole('cell', { name: caseNo, exact: true }).click();
    }

    async navigateToFirmEventList() {
        await this.CalendarMenu.click();
        await this.FirmEventListMenu.click();
    }

    async navigateToRecentCase() {
        await this.CaseMenu.click();
        await this.RecentCaseMenu.click();
    }

    async navigateToFirmTaskList() {
        await this.TaskMenu.click();
        await this.FirmTaskListMenu.click();
    }
}
module.exports = { Menu };