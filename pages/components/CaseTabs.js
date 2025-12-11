class CaseTabs {
    constructor(page) {
        this.page = page;
        this.EventListTab = this.page.getByRole('tab', { name: 'Calendar' });
        this.TaskListTab = this.page.getByRole('tab', { name: 'Tasks' });
    }

    async navigateToCaseEventList() {
        await this.EventListTab.click();
    }

    async navigateToCaseTaskList() {
        await this.TaskListTab.click();
    }
}
module.exports = { CaseTabs };