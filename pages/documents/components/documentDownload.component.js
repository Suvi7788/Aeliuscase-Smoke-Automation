import { expect } from "@playwright/test";

export class DocumentDownloadComponent {
    constructor(page) {
        this.page = page;
        this.documentOptions = page.locator('button[ptooltip="Options"]').first();
        this.downloadBtn = page.locator('a:has-text("Download to PC")');


    }

    async downloadDocument() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.documentOptions.click(),
            this.downloadBtn.click()
        ]);

        expect(download).toBeTruthy();
    }


}