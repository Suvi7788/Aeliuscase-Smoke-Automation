class SettingsPanal {
    constructor(page) {
        this.page = page;
        this.adminToolsPanel = page.getByRole('button', { name: 'Admin / Tools' });

        this.users = page.getByText('Users', { exact: true });
        this.userPolicy = page.getByText('User Policy', { exact: true });
        this.employeeCases = page.getByRole('treeitem', { name: 'Employee Cases' });
        this.employeeTasks = page.getByRole('treeitem', { name: 'Employee Tasks' })
        this.firmSettings = page.getByRole('link', { name: 'Firm Settings' });
        this.announcements = page.getByText('Announcements', { exact: true });

        this.settingsBtn = page.locator('#layout-config-button');
        this.adminToolsDropdownBtn =page.getByRole('button', {name: 'Admin / Tools'}); //case dropdown is the same as admin tools dropdown locator
        this.employeeTasksCount = page.getByText('Employee Open Task Summary')
        this.printButton = page.getByRole('button', { name: 'Print' });
    }

    async openSettingsPanal(){
        await this.settingsBtn.click();
    }

    async openAdminToolsDropdown(){
        await this.adminToolsDropdownBtn.click();
    }

    async openAdminToolsPanel() {
        if (await this.adminToolsPanel.getAttribute('aria-expanded') === 'false') {
      await this.adminToolsPanel.click();
    }
  }

  async goToFirmSettings() {
    await this.openAdminToolsPanel();
    await this.firmSettings.click();
  }
  async openAdminTool(menuName) {
    await this.openAdminToolsPanel();
    await this.page.getByText(menuName, { exact: true }).click();
  }
  async openEmployeeCases() {
    await this.employeeCases.click();
  }
  async openEmployeeTasks() {
    await this.employeeTasks.click();
  }
  async openEmployeeTasksVerify() {
    await this.employeeTasksCount.click();
  }
  async printEmployeeTasksCount() {
    await this.printButton.isVisible();
  }
  async printEmployeeTasksCountVerify() {
    await this.printButton.click();
  }
  async closeAdminToolsDropdown(){
    await this.employeeTasksCount.click();
  }

}
module.exports = { SettingsPanal };