import { test, expect } from '@playwright/test';

test('Save email login state (manual)', async ({ page, context }) => {
    // 1️⃣ AeliusCase login already happens (your existing login automation)

    // 2️⃣ Navigate to Email module
    await page.goto('/dashboard/mail');

    await page.click('button:has-text("Login")')

    // Wait until Email login screen appears
    // await expect(page.locator('button:has-text("Login")')).toBeVisible();

    // 3️⃣ Click Login → OAuth popup opens
    // const [popup] = await Promise.all([
    //     page.waitForEvent('popup'),
    //     // page.click('button:has-text("Login")')
    // ]);

    // 4️⃣ MANUAL STEP (IMPORTANT)
    // 👉 Login manually in the popup (Google / Outlook)
    // 👉 Approve permissions if asked
    // 👉 Wait until popup closes automatically

    // await popup.waitForClose();

    // 5️⃣ Verify inbox loaded in main app
    // await expect(page.locator('text=Inbox')).toBeVisible();

    // 6️⃣ SAVE AUTH STATE
    await context.storageState({ path: 'auth/email-auth.json' });

    console.log('✅ Email auth saved successfully');
});
