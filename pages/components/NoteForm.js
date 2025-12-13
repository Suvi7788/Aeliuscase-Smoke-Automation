class NoteForm {
    constructor(page) {
        this.page = page;
        this.Description = page.locator(".ql-editor");
        this.SaveBtn = page.getByRole('button', { name: 'Save' });

    }
    async fillNoteForm(Description) {
        await this.Description.fill(Description);
    }
    async submitNoteForm() {
        await this.SaveBtn.click();
    }
}
module.exports = { NoteForm };