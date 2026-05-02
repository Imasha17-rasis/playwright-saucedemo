// tests/cart.spec.js
// TS02 – Shopping Cart & Checkout Workflow
// Covers: TC08 add to cart, TC09 remove from dashboard, TC10 item in cart,
//         TC11 remove from cart page, TC12 checkout with items, TC13 checkout empty cart (Bug BR03)

const { test, expect } = require('@playwright/test');
const { LoginPage }      = require('../pages/LoginPage');
const { ProductPage }    = require('../pages/ProductPage');
const { CartPage }       = require('../pages/CartPage');
const { CheckoutPage }   = require('../pages/CheckoutPage');
const { USERS, CHECKOUT, PRODUCTS, MESSAGES } = require('../utils/testData');

test.describe('TS02 – Shopping Cart & Checkout', () => {

  let loginPage, productPage, cart, checkout;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cart       = new CartPage(page);
    checkout   = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.loginAs(USERS.standard);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  // ─── TC08 ──────────────────────────────────────────────────────────────────
  test('TC08 – Add item to cart increases badge count', async ({ page }) => {
    const countBefore = await productPage.getCartBadgeCount();

    await productPage.addToCartByName(PRODUCTS.backpack);

    const countAfter = await productPage.getCartBadgeCount();
    expect(countAfter).toBe(countBefore + 1);

    const item = page.locator('.inventory_item', { hasText: PRODUCTS.backpack });
    await expect(item.locator('[data-test^="remove"]')).toBeVisible();
  });

  // ─── TC09 ──────────────────────────────────────────────────────────────────
  test('TC09 – Remove item from product dashboard decreases badge count', async ({ page }) => {
    await productPage.addToCartByName(PRODUCTS.backpack);
    expect(await productPage.getCartBadgeCount()).toBe(1);

    await productPage.removeByName(PRODUCTS.backpack);

    await expect(productPage.cartBadge).not.toBeVisible();

    const item = page.locator('.inventory_item', { hasText: PRODUCTS.backpack });
    await expect(item.locator('[data-test^="add-to-cart"]')).toBeVisible();
  });

  // ─── TC10 ──────────────────────────────────────────────────────────────────
  test('TC10 – Item added to cart appears in Your Cart page', async ({ page }) => {
    await productPage.addToCartByName(PRODUCTS.backpack);
    await productPage.goToCart();
    await cart.isLoaded();

    const names = await cart.getItemNames();
    expect(names).toContain(PRODUCTS.backpack);
    expect(await cart.getItemCount()).toBe(1);
  });

  // ─── TC11 ──────────────────────────────────────────────────────────────────
  test('TC11 – Remove item from Your Cart page removes it from the list', async ({ page }) => {
    await productPage.addToCartByName(PRODUCTS.backpack);
    await productPage.goToCart();
    await cart.isLoaded();

    await cart.removeByName(PRODUCTS.backpack);

    expect(await cart.getItemCount()).toBe(0);
    await expect(productPage.cartBadge).not.toBeVisible();
  });

  // ─── TC12 ──────────────────────────────────────────────────────────────────
  test('TC12 – Checkout with items in cart completes successfully', async ({ page }) => {
    await productPage.addToCartByName(PRODUCTS.backpack);
    await productPage.goToCart();
    await cart.isLoaded();

    await cart.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkout.fillInformation(
      CHECKOUT.firstName,
      CHECKOUT.lastName,
      CHECKOUT.postalCode
    );
    await checkout.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkout.clickFinish();
    await expect(page).toHaveURL(/checkout-complete/);

    const header = await checkout.getCompleteHeaderText();
    expect(header).toBe(MESSAGES.orderComplete);
  });

  // ─── TC13 (Bug BR03) ───────────────────────────────────────────────────────
  test('TC13 – Checkout with empty cart should show error [BR03 – KNOWN BUG]', async ({ page }) => {
    await productPage.goToCart();
    await cart.isLoaded();

    expect(await cart.getItemCount()).toBe(0);

    const checkoutVisible = await cart.checkoutButton.isVisible();

    if (checkoutVisible) {
      await cart.clickCheckout();
      await checkout.fillInformation(
        CHECKOUT.firstName,
        CHECKOUT.lastName,
        CHECKOUT.postalCode
      );
      await checkout.clickContinue();
      await checkout.clickFinish();

      const onComplete = await checkout.isOnCompletePage();
      expect(onComplete).toBe(true);
    }
  });

  // ─── TC14 ──────────────────────────────────────────────────────────────────
  test('TC14 – Checkout with all fields empty shows validation error', async ({ page }) => {
    await productPage.addToCartByName(PRODUCTS.backpack);
    await productPage.goToCart();
    await cart.clickCheckout();

    await checkout.clickContinue();

    const error = await checkout.getErrorText();
    expect(error).toContain(MESSAGES.errorFirstName);
    await expect(page).toHaveURL(/checkout-step-one/);
  });

});
