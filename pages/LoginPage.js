class LoginPage{
    constructor(page){
        this.page=page;

        //Locators
        this.username=page.locator("#usernameInp");
        this.password=page.locator("#passwordInp");
        this.loginBtn=page.locator("#loginBtn");

    }

    async gotoLogin(){
        await this.page.goto("https://uat.aeliuscase.com/login")
    }

    async login(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}

module.exports={LoginPage};