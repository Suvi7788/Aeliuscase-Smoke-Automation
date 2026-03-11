const { test } = require("@playwright/test");
const UserData = require("../../data/UserData.json");


const { ProfilePage } = require("../../pages/profile/profilePage");
const { SettingsPanal } = require("../../pages/firm/settingsPanal");
const { UsersPage } = require("../../pages/firm/adminTools/usersPage");
const { NewUserForm } = require("../../pages/firm/components/newUserForm");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test('Add New User', async ({ page }) => {
    test.setTimeout(60000);
    const settingsPanal = new SettingsPanal(page);
    await settingsPanal.openSettingsPanal();
    await settingsPanal.openAdminToolsDropdown();  //case dropdown is the same as admin tools dropdown locator
    await settingsPanal.openEmployeeTasks();
    await settingsPanal.closeAdminToolsDropdown(); //using because the employee tasks count is not visible when the admin tools dropdown is open
    await settingsPanal.printEmployeeTasksCount();
    await settingsPanal.printEmployeeTasksCountVerify();
});

