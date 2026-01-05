import { expect } from '@playwright/test';

export class PrintPreviewPopup {
  constructor(page) {
    this.page = page;

    this.msgPrintButton = page.locator(
      "//span[@class='p-button-label' and normalize-space()='Print']"
    );
    this.taskPrintButton = page.locator(
      "//span[@class='p-button-label' and normalize-space()='Print']"
    );
    this.eventPrintButton = page.locator(
      "//span[@class='p-button-label' and normalize-space()='Print']"
    );
  }

  //verify Message Print
  async verifyMsgPrintButtonVisible() {
    await expect(this.msgPrintButton).toBeVisible();
  }

  async clickMsgPrintButton() {
    await this.msgPrintButton.click();
  }

  async verifyMsgDataLoadingToPrint() {
    await expect(this.page.locator('div').locator('div').nth(0)).toBeVisible();
  }

  //verify task Print
  async verifyTaskPrintButtonVisible() {
    await expect(this.taskPrintButton).toBeVisible();
  }

  async clickTaskPrintButton() {
    await this.taskPrintButton.click();
  }

  async verifyTaskDataLoadingToPrint() {
    await expect(this.page.locator('div').locator('div').nth(0)).toBeVisible();
  }

  //verify Event Print
  async verifyEventPrintButtonVisible() {
    await expect(this.eventPrintButton).toBeVisible();
  }

  async clickEventPrintButton() {
    await this.eventPrintButton.click();
  }

  async verifyEventDataLoadingToPrint() {
    await expect(this.page.locator('div').locator('div').nth(0)).toBeVisible();
  }

}

module.exports = { PrintPreviewPopup };
