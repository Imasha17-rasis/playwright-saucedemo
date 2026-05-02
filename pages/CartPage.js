class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.itemName = '.inventory_item_name';
    this.removeButton = '[data-test^="remove"]';
  }

  async isLoaded() {
    await this.page.waitForSelector('.cart_list');
  }

  async getItemNames() {
    const items = await this.cartItems.locator(this.itemName).allTextContents();
    return items;
  }

  async getItemCount() {
    const count = await this.cartItems.count();
    return count;
  }

  async removeByName(productName) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    const button = item.locator(this.removeButton);
    await button.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };