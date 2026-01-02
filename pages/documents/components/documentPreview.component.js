import { expect } from "@playwright/test";

export class DocumentPreviewComponent {
  constructor(page) {
    this.previewContainer = page.locator('.preview-container > .preview-container');
    this.pdfIframe = page.locator(
      'iframe[title="ng2-pdfjs-viewer"]'
    );
  }

  async expectLoaded() {
    await expect(this.previewContainer).toBeVisible();
    await expect(this.pdfIframe).toBeVisible();
    await expect(this.pdfIframe).toHaveAttribute('src', /blob/);
  }
}