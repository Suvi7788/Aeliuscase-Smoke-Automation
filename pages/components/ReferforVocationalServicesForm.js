// pages/components/ReferforVocationalServicesForm.js
const path = require('path');
const fs = require('fs');

class ReferforVocationalServicesForm {
    constructor(page) {
        this.page = page;

        //Main form elements
        this.ReferforVocationalServicesForm = page.locator('//span[normalize-space()="Refer for Vocational Services"]');
        this.ReferforVocationalServicesFormEdit = page.getByText('Edit', { exact: true });
        this.ReferforVocationalServicesFormSave = page.getByText('Save', { exact: true });
        this.ReferforVocationalServicesFormClose = page.getByText('Close', { exact: true });

        // Radio buttons/ Checkboxes
        this.sjdbRadioButton = page.locator("//label[normalize-space()='SJDB']");
        this.rtwsppRadioButton = page.locator("//label[normalize-space()='RTWSP']");

        //view document
        this.viewButton = page.locator("//span[@class='p-button-icon pi pi-eye']");

        // File in table - FIXED: Use contains instead of exact match
        this.fileTextInTable = page.locator('text=test-document').or(page.locator('text=test-document.pdf'));

        //delete file
        this.deleteFileButton = page.locator("//button[@class='p-element p-ripple p-button-danger custom-button p-button-raised ml-2 p-button p-component p-button-icon-only ng-star-inserted']");

        //confermDelete
        this.confermDelete = page.getByText('Proceed', { exact: true })

        //delete success message
        this.deleteSuccessMessage = page.getByText('File successfully removed', { exact: true })

        //save success message
        this.saveSuccessMessage = page.getByText('Form Updated successfully.', { exact: true })

        this.fileInput= page.locator('p-fileupload input[type="file"]');

    }

    navigateToReferforVocationalServicesEditMode() {
        this.ReferforVocationalServicesFormEdit.click();

    }


    // Select SJDB option
    async selectSJDB() {
        // Check if already selected
        const isSelected = await this.sjdbRadioButton.isChecked();

        if (!isSelected) {
            // Try clicking the radio button directly
            await this.sjdbRadioButton.click();

            // If that doesn't work, click the label
            if (!await this.sjdbRadioButton.isChecked()) {
                await this.sjdbRadioButton.click();
            }
        }

        console.log('SJDB selected:', await this.sjdbRadioButton.isChecked());
    }

    // Select RTWSPP option
    async selectRTWSPP() {
        // Check if already selected
        const isSelected = await this.rtwsppRadioButton.isChecked();

        if (!isSelected) {
            // Try clicking the radio button directly
            await this.rtwsppRadioButton.click();

            // If that doesn't work, click the label
            if (!await this.rtwsppRadioButton.isChecked()) {
                await this.rtwsppLabel.click();
            }
        }

        console.log('RTWSPP selected:', await this.rtwsppRadioButton.isChecked());
    }

    // Select the OTHER option (if one is selected, select the other)
    async selectOtherOption() {
        const isSJDBSelected = await this.sjdbRadioButton.isChecked();
        const isRTWSPPSelected = await this.rtwsppRadioButton.isChecked();

        if (isSJDBSelected) {
            // If SJDB is selected, select RTWSPP
            await this.selectRTWSPP();
        } else if (isRTWSPPSelected) {
            // If RTWSPP is selected, select SJDB
            await this.selectSJDB();
        } else {
            // If neither is selected, select SJDB by default
            await this.selectSJDB();
        }
    }

    // Toggle between options (always switch to the other one)
    async toggleVoucherOption() {
        const isSJDBSelected = await this.sjdbRadioButton.isChecked();

        if (isSJDBSelected) {
            await this.selectRTWSPP();
        } else {
            await this.selectSJDB();
        }
    }

    async saveReferforVocationalServicesForm() {
        await this.ReferforVocationalServicesFormSave.click();
        await this.saveSuccessMessage.isVisible();

    }

    async closeReferforVocationalServicesForm() {
        await this.ReferforVocationalServicesFormClose.click();
    }

    async verifyViewOpensCorrectFile() {
        console.log('=== Smoke Test: Verify View button opens new tab ===');

        // 1. Count tabs before
        const tabsBefore = this.page.context().pages().length;

        // 2. Click View
        await this.viewButton.click();
        await this.page.waitForTimeout(3000); // Wait for new tab

        // 3. Count tabs after
        const tabsAfter = this.page.context().pages().length;

        if (tabsAfter > tabsBefore) {
            console.log(`✓ SUCCESS: New tab opened (${tabsBefore} → ${tabsAfter})`);

            // Close new tab
            const pages = this.page.context().pages();
            const newTab = pages[pages.length - 1];
            await newTab.close();
            await this.page.bringToFront();

            return {
                success: true,
                message: 'View button opened new tab successfully',
                tabsBefore: tabsBefore,
                tabsAfter: tabsAfter
            };
        } else {
            console.log(`✗ FAIL: No new tab opened (${tabsBefore} → ${tabsAfter})`);
            return {
                success: false,
                message: 'View button did not open new tab',
                tabsBefore: tabsBefore,
                tabsAfter: tabsAfter
            }
        }

    }

    async deleteFile() {
        await this.deleteFileButton.click();
        await this.confermDelete.click();
        await this.deleteSuccessMessage.isVisible();
    }


    async uploadDocument(filePath) {
        await this.fileInput.setInputFiles(filePath);
    }
};







module.exports = { ReferforVocationalServicesForm };