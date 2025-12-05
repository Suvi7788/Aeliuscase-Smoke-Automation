class LoginPage{
    // Constructor runs when you create a new LoginPage object
    constructor(page){
        // Save the Playwright 'page' object to use in this class
        this.page=page;

        // ---------- Locators (elements on the page) ----------
        // Username input field
        this.username=page.locator("#usernameInp");
        // Password input field
        this.password=page.locator("#passwordInp");
        // Login button
        this.loginBtn=page.locator("#loginBtn");

    }

    // ---------- Method to open the login page ----------
    async gotoLogin(){
        // Navigate the browser to the login URL
        await this.page.goto("https://uat.aeliuscase.com/login")
    }

    // ---------- Method to perform login ----------
    async login(username,password){
        // Type the username into the username input field
        await this.username.fill(username);
        // Type the password into the password input field
        await this.password.fill(password);
        // Click the login button
        await this.loginBtn.click();
    }
}
// Export LoginPage so it can be used in test files
module.exports={LoginPage};