class EmailInboxSection {
    constructor(page) {
        this.page = page;
        this.composeButton = page.getByRole('button', { name: 'Compose' })

        this.fromEmailField = page.locator('input[formcontrolname="from"]')
        this.toEmailField = page.locator('input[formcontrolname="to"]')
        this.subjectInput = page.locator('input[formcontrolname="subject"]')
        this.messageInput = page.locator('textarea[formcontrolname="message"]')
        this.sendButton = page.getByRole('button', { name: 'Send' })
        this.loginButton = page.getByRole('button', { name: 'login' })

    }

    async login(email, password) {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click('button:has-text("Login")')
        ]);
        await popup.waitForSelector('input[type="email"]');
        await popup.fill('input[type="email"]', email);
        await popup.click('button:has-text("Next")');

        await popup.waitForSelector('input[type="password"]');
        await popup.fill('input[type="password"]', password);
        await popup.click('button:has-text("Next")');

    }


    async openComposeForm() {
        await this.composeButton.click();
    }

    async selectFromEmail(email) {
        await this.fromEmailField.click();
        await this.page.getByRole('option', { name: email }).click();
    }


    async composeEmail(toEmail, subject, message) {
        await this.toEmailField.fill(toEmail);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.sendButton.click();
    }
}
module.exports = { EmailInboxSection };