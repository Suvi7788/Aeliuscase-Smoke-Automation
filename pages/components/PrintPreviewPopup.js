import { expect } from '@playwright/test';

export class PrintPreviewPopup {
  constructor(page) {
    this.page = page;

    this.printButton = page.locator(
      "//span[@class='p-button-label' and normalize-space()='Print']"
    );
  }

  //Message Print
  async verifyPrintButtonVisible() {
    await expect(this.printButton).toBeVisible();
  }

  async clickPrintButton() {
    await this.printButton.click();
  }

  async verifyDataLoadingToPrint(){
    await expect(this.page.locator("//div[@class='card mb-1 ng-star-inserted']//div[2]//div[3]//div[1]//div[1]//div[1]")).toBeVisible();
  }

}

module.exports = { PrintPreviewPopup };
