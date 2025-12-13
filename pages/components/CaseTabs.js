class CaseTabs {
    constructor(page) {
        this.page = page;
        this.EventListTab = this.page.getByRole('tab', { name: 'Calendar' });
        this.TaskListTab = this.page.getByRole('tab', { name: 'Tasks' });
        this.NoteListTab = this.page.getByRole('tab', { name: 'Notes' });
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
}
module.exports = { CaseTabs };