class BasePage {
    constructor(page) {
        this.page = page;
    }
    async waitForAPIResponse(apiUrl) {
        await this.page.waitForResponse(response =>
            response.url().includes(apiUrl) &&
            response.status() === 200
        );
    }
}
module.exports = { BasePage };