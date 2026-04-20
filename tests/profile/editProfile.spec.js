const { test } = require("@playwright/test");
const { Menu } = require("../../pages/Menu");
const { ProfilePage } = require("../../pages/profile/profilePage");


test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
});

test.skip('View Profile', async ({ page }) => {
    const menu = new Menu(page);
    const profilePage = new ProfilePage(page);
    await menu.openProfile();
    await profilePage.editProfile();
    await profilePage.saveProfile();
    await profilePage.saveSuccessMsg();
});