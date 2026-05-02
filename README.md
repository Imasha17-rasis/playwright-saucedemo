SauceDemo Automation Testing with Playwright

This project is a UI automation testing framework built using Playwright and JavaScript.

The project automates test scenarios on SauceDemo, a demo e-commerce web application used for automation practice.

---

Features

- Login Testing
  - Valid Login
  - Invalid Login
  - Locked User Login
  - Logout

- Cart Testing
  - Add product to cart
  - Remove product from cart
  - Verify cart items

- Checkout Testing
  - Fill customer information
  - Complete order
  - Verify successful checkout

---

Tech Stack

- JavaScript
- Playwright
- Node.js
- Visual Studio Code

---
## Project Structure

```text
playwright-saucedemo/
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   ├── login.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
│
├── utils/
│   └── testData.js
│
└── README.md
```

---

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run with browser UI:

```bash
npx playwright test --headed
```

Run in debug mode:

```bash
npx playwright test --debug
```

---

Test Website

SauceDemo URL: https://www.saucedemo.com

---

Author
Imasha Rupasinghe  
QA Automation Learning Project
