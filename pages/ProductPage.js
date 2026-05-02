class ProductPage {

    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutBtn = page.locator('#logout_sidebar_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async logout() {
        await this.menuBtn.click();
        await this.logoutBtn.click();
    }

    async getCartBadgeCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        const isVisible = await badge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text = await badge.textContent();
        return parseInt(text, 10);
    }

    async addToCartByName(productName) {
        const item = this.page.locator('.inventory_item', { hasText: productName });
        const button = item.locator('[data-test^="add-to-cart"]');
        await button.click();
    }

    async removeByName(productName) {
        const item = this.page.locator('.inventory_item', { hasText: productName });
        const button = item.locator('[data-test^="remove"]');
        await button.click();
    }

    async goToCart() {
        await this.cartLink.click();
    }
}

module.exports = { ProductPage };