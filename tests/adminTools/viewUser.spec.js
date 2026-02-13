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
    await settingsPanal.openAdminToolsDropdown();  
    await settingsPanal.openAdminTool('Users');
    const usersPage = new UsersPage(page);
    await usersPage.openOptions();
    await usersPage.openViewUser();
    await usersPage.verifyViewUserVisible();
});

