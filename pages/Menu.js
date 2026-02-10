const { ListUnassignedPage } = require("./documents/ListUnassignedPage");

class Menu {
    constructor(page) {
        this.page = page;
        this.profileIcon = page.locator('div[data-pc-name="avatar"]').first();
        this.profileDropdown = page.locator('li[role="menuitem"]:has-text("Profile")');

        this.menu = {
            calendar: page.getByRole('menuitem', { name: 'Calendar' }),
            case: page.getByRole('menuitem', { name: 'Case' }),
            task: page.getByRole('menuitem', { name: 'Task' }),
            document: page.getByRole('menuitem', { name: 'Document' }),
            rolodex: page.getByRole('menuitem', { name: 'Rolodex' }),
            email: page.getByRole('menuitem', { name: 'Mail' }),
            cases: page.getByRole('menuitem', { name: 'Cases' }),
        };

        this.subMenu = {
            firmEventList: page.getByRole('menuitem', { name: 'List' }),
            recentCases: page.getByRole('menuitem', { name: 'Recent Cases' }),
            tasksInbox: page.getByRole('menuitem', { name: 'Tasks Inbox' }),
            uploadUnassigned: page.getByRole('menuitem', { name: 'Upload Unassigned' }),
            uploadBatchscan: page.getByRole('menuitem', { name: 'Upload Batchscan' }),
            listUnassigned: page.getByRole('menuItem',{name:'List Unassigned'}),
            listExtract: page.getByRole('menuItem',{name:'List Extracts'}),
            emailSettings: page.getByRole('menuitem', { name: 'Email Settings' }),
            emailInbox: page.getByRole('menuitem', { name: 'Inbox' }),
            unreadMessages: page.getByRole('menuitem', { name: 'Unread Messages' }),
            sent: page.getByRole('menuitem', { name: 'Sent' }),
            draft: page.getByRole('menuitem', { name: 'Draft' }),
            compose: page.getByRole('menuitem', { name: 'Compose' }),
            contacts: page.getByRole('menuitem', { name: 'Contacts' }),
            blockedSpam: page.getByRole('menuitem', { name: 'Blocked SPAM' }),
            activeCases: page.getByRole('menuitem', { name: 'Active Cases' }),
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

    async openProfile(){
            await this.profileIcon.click();
            await this.profileDropdown.click();
        }

}

module.exports = { Menu };
