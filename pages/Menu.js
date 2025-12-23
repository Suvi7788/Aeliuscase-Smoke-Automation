const { ListUnassignedPage } = require("./documents/ListUnassignedPage");

class Menu {
    constructor(page) {
        this.page = page;

        this.menu = {
            calendar: page.getByRole('menuitem', { name: 'Calendar' }),
            case: page.getByRole('menuitem', { name: 'Case' }),
            task: page.getByRole('menuitem', { name: 'Task' }),
            document: page.getByRole('menuitem', { name: 'Document' }),
        };

        this.subMenu = {
            firmEventList: page.getByRole('menuitem', { name: 'List' }),
            recentCases: page.getByRole('menuitem', { name: 'Recent Cases' }),
            tasksInbox: page.getByRole('menuitem', { name: 'Tasks Inbox' }),
            uploadUnassigned: page.getByRole('menuitem', { name: 'Upload Unassigned' }),
            uploadBatchscan: page.getByRole('menuitem', { name: 'Upload Batchscan' }),
            listUnassigned: page.getByRole('menuItem',{name:'List Unassigned'}),
            listExtract: page.getByRole('menuItem',{name:'List Extracts'}),

        };

        this.searchInput = page.getByRole('combobox', { name: 'Search' });
    }

    async openMenu(menu) {
        await this.menu[menu].waitFor({ state: 'visible' });
        await this.menu[menu].click();
    }

    async navigate(menu, subMenu) {
        await this.openMenu(menu);
        await this.subMenu[subMenu].waitFor({ state: 'visible' });
        await this.subMenu[subMenu].click();
    }

    async searchForCase(caseNo) {
        await this.searchInput.fill(caseNo);
        await this.page.getByRole('cell', { name: caseNo, exact: true }).click();
    }
}

module.exports = { Menu };
