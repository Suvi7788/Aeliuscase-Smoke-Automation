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
    this.recentCasePrintButton = page.getByText('Print Cases', { exact: true });
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

  //verify Recent Case Print
  async verifyRecentCasePrintButtonVisible() {
    await expect(this.recentCasePrintButton).toBeVisible();
  }

  async clickRecentCasePrintButton() {
    await this.recentCasePrintButton.click();
  }

  async verifyRecentCaseDataLoadingToPrint() {
    await expect(this.page.locator("//app-print-cases[@class='ng-tns-c4029148367-741']//div//div[@class='card']")).toBeVisible();
  }

}

module.exports = { PrintPreviewPopup };
