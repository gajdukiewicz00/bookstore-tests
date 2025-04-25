import {LoginPage} from "../../../../pages/LoginPage";
import {BookPage} from "../../../../pages/BookPage";
import {expect, test} from "@playwright/test";



test('User can login to Bookstore', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('testuser', 'TestPass123!');
    await expect(page.locator('#userName-value')).toHaveText('TestUser');
});

test('Login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_pass');
    const error = await loginPage.getErrorMessage();
    await expect(error).toHaveText('Invalid username or password!');
});

test('Books are displayed on the main page', async ({ page }) => {
    const bookPage = new BookPage(page);
    await bookPage.goto();
    const count = await bookPage.getBooksCount();
    expect(count).toBeGreaterThan(0);
});

test('User can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('testuser', 'TestPass123!');
    await expect(page.locator('#userName-value')).toHaveText('TestUser');
    await loginPage.logout();
    await expect(page.locator('#login')).toBeVisible();
});
