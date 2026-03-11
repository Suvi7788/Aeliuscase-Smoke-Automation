const { expect } = require("@playwright/test");

class MedIndexSection {
    constructor(page) {
        this.page = page;
        this.addMedIndexBtn = page.locator('button[ptooltip="Create Exam"]')
        this.selectMedicalProvider = page.getByRole('combobox', { name: 'Select a Medical Provider' });
        this.selectMedicalProviderOption = page.getByRole('option', { name: 'med' })
        this.examDateInput = page.locator('p-calendar[formcontrolname="examDate"] input');
        this.serveDateInput = page.locator('p-calendar[formcontrolname="serveDate"] input');
        this.saveBtn = page.locator('button', { hasText: 'Save' });
        this.selectMedicalIndexOption = page.locator('button[ptooltip="Options"]').first()
        this.editExamClick = page.getByRole('menuitem', { name: 'Edit Exam' })
        this.editor = page.locator('.ql-editor');
        this.deleteBtn = page.locator('button[ptooltip="Delete"]').first()
        this.deleteConfirmBtn = page.getByText('Proceed', { exact: true })
        this.verifyDeleteSuccessMsgConfirm = page.locator('div.p-toast-detail', { hasText: 'Successfully deleted' })
    }

    async addMedIndex() {
        await this.addMedIndexBtn.click();
    }

    async selectMedicalProviderClick () {
       await this.selectMedicalProvider.click();
    }

    async selectMedicalProviderOptionClick() {
        await this.selectMedicalProviderOption.click();
    }
    async examDate() {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const todayFormatted = `${day}/${month}/${year}`;

        // Fill Exam Date (Today)
        await this.examDateInput.fill(todayFormatted);

    }
    async serveDate() {
        const serveDate = new Date();
        serveDate.setDate(serveDate.getDate() + 2);

        const serveDay = String(serveDate.getDate()).padStart(2, '0');
        const serveMonth = String(serveDate.getMonth() + 1).padStart(2, '0');
        const serveYear = serveDate.getFullYear();

        const serveFormatted = `${serveDay}/${serveMonth}/${serveYear}`;

        // Fill Serve Date (Today + 2)
        await this.serveDateInput.fill(serveFormatted);

    }
    async save() {
        await this.saveBtn.click();
    }
    async option() {
        await this.selectMedicalIndexOption.click();
    }
    async editExam() {
        await this.editExamClick.click();
    }
    async editExamContent(){
        await this.editor.fill('test edit exam');
    }
    async saveEditExam(){
        await this.saveBtn.click();
    }
    async deleteExam(){
        await this.deleteBtn.click();
    }
    async deleteConfirm(){
        await this.deleteConfirmBtn.click();
    }
    async verifyDeleteSuccessMsg(){
        await expect(this.verifyDeleteSuccessMsgConfirm).toBeVisible();
    }


}

module.exports = MedIndexSection;
