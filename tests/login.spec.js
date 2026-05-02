const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { USERS, MESSAGES } = require('../utils/testData');

test.describe('Login Tests', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.open();
    });

    // TC01
    test('Valid login', async ({ page }) => {

        await loginPage.loginAs(USERS.standard);

        await expect(page).toHaveURL(/inventory/);

        const productPage = new ProductPage(page);

        await expect(productPage.title)
            .toHaveText('Products');
    });


    // TC02
    test('Invalid login', async ({ page }) => {

        await loginPage.login(
            'wrong_user',
            'wrong_password'
        );

        await expect(loginPage.error)
            .toBeVisible();
    });


    // TC03
    test('Locked user login', async ({ page }) => {

        await loginPage.loginAs(USERS.locked);

        await expect(loginPage.error)
            .toBeVisible();
    });


    // TC04
    test('Logout', async ({ page }) => {

        await loginPage.loginAs(USERS.standard);

        const productPage = new ProductPage(page);

        await productPage.logout();

        await expect(page.locator('[data-test="login-button"]'))
            .toBeVisible();

    });

});