const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce'
  },
  visual: {
    username: 'visual_glitch_user',
    password: 'secret_sauce'
  }
};

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bike: 'Sauce Labs Bike Light',
  shirt: 'Sauce Labs Bolt T-Shirt',
  jacket: 'Sauce Labs Fleece Jacket'
};

const CHECKOUT = {
  firstName: 'Imasha',
  lastName: 'Rupasinghe',
  postalCode: '81400'
};

const MESSAGES = {
  invalidCreds: 'Username and password do not match any user in this service',
  requiredUsername: 'Username is required',
  requiredPassword: 'Password is required',
  lockedOut: 'Sorry, this user has been locked out.',
  orderComplete: 'Thank you for your order!',
  errorFirstName: 'Error: First Name is required'
};

module.exports = { USERS, PRODUCTS, CHECKOUT, MESSAGES };
