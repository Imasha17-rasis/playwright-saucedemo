class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.error = page.locator('[data-test="error"]');
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async navigate() {
        await this.open();
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async loginAs(user) {
        await this.login(user.username, user.password);
    }

    async getErrorText() {
        return await this.error.textContent();
    }

}

module.exports = { LoginPage };