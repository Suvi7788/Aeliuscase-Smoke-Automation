import { expect } from "@playwright/test";

export class DocumentPreviewComponent {
  constructor(page) {
    this.previewContainer = page.locator('.preview-container > .preview-container');
    this.casePreviewContainer = page.locator('.preview-container');
    this.pdfIframe = page.locator(
      'iframe[title="ng2-pdfjs-viewer"]'
    );
  }

  async expectLoaded(caseDocs) {

    if(caseDocs){
      await expect(this.casePreviewContainer).toBeVisible();
    }else{
      await expect(this.previewContainer).toBeVisible();
    }
    await expect(this.pdfIframe).toBeVisible();
    await expect(this.pdfIframe).toHaveAttribute('src', /blob/);
  }
}