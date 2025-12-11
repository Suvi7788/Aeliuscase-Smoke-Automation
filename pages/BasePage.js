class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Wait for an API response to complete with status 200
     * @param {string} apiUrl - partial URL of the API endpoint
     */
    async waitForAPIResponse(apiUrl) {
        await this.page.waitForResponse(response =>
            response.url().includes(apiUrl) &&
            response.status() === 200
        );
    }

    /**
     * Navigate to a URL and wait for a specific API response triggered by that navigation
     * @param {string} url - URL to navigate
     * @param {string} apiUrl - API endpoint to wait for
     */
    async gotoAndWaitForAPI(url, apiUrl) {
        await Promise.all([
            this.waitForAPIResponse(apiUrl),
            this.page.goto(url)
        ]);
    }
}
module.exports = { BasePage };