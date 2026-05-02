class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickFinish() {
    await this.finishButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCompleteHeaderText() {
    return await this.completeHeader.textContent();
  }

  async isOnCompletePage() {
    try {
      await this.page.waitForURL(/checkout-complete/, { timeout: 1000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getErrorText() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.textContent();
  }
}

module.exports = { CheckoutPage };