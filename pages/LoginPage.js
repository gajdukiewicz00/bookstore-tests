class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#userName';
        this.passwordInput = '#password';
        this.loginButton = '#login';
        this.errorMessage = '#name';
        this.logoutButton = '#submit'; // Это кнопка logout на странице профиля
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return this.page.locator(this.errorMessage);
    }

    async logout() {
        await this.page.goto('/profile');
        await this.page.click(this.logoutButton);
    }
}

module.exports = { LoginPage };
