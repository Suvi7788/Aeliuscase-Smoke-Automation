class Menu {
    constructor(page) {
        this.page = page;
        this.CalendarMenu = page.locator('span.menubar-custom-label', { hasText: 'Calendar' }).first();
        this.FirmEventListMenu = page.locator('[id="74"] a').filter({ hasText: 'List' });
    }
    async navigateToFirmEventList() {
        await this.CalendarMenu.click();
        await this.FirmEventListMenu.click();
    }
}
module.exports = { Menu };