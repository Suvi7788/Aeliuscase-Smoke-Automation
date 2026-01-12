class RolodexPage {
    constructor(page) {
        this.page = page;
        this.addCompanyBtn = page.getByRole('button', { name: 'New Company' });
    }

    async openAddCompanyForm() {
        await this.addCompanyBtn.click();
    }
}

module.exports = { RolodexPage };
