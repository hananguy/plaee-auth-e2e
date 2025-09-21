# Auth E2E Test Suite

Playwright test automation for login and signup functionality.

## 📁 Project Structure

```
├── pages/
│   ├── LoginPage.js          # Login Page Object
│   └── SignupPage.js         # Signup Page Object
├── tests/
│   ├── login.success.spec.js         # Login success flow
│   ├── login.validation.spec.js      # Login validation tests
│   ├── login.visibility.spec.js      # Login UI visibility tests
│   ├── login.forgot-password.spec.js # Forgot password flow
│   ├── signup.success.spec.js        # Signup success flow
│   ├── signup.validation.spec.js     # Signup validation tests
│   ├── signup.visibility.spec.js     # Signup UI visibility tests
│   ├── example.spec.js               # Example test file
│   ├── _explore.spec.js              # Exploration test file
│   └── test-config.js                # Test configuration
├── utils/
│   ├── testData.js           # Test data management
│   ├── constants.js          # Error messages
│   └── expecters.js          # Custom assertions
└── playwright.config.js      # Playwright configuration
```

## 🚀 Run Tests

**All Tests:**
```bash
npx playwright test --project=chromium
```

**Specific Test Suites:**
```bash
# Login tests
npx playwright test "tests/login.*.spec.js" --project=chromium

# Signup tests  
npx playwright test "tests/signup.*.spec.js" --project=chromium

# Validation tests only
npx playwright test "tests/*.validation.spec.js" --project=chromium
```

**Debug Mode:**
```bash
npx playwright test "tests/login.validation.spec.js" --project=chromium --debug
```

## 📊 Test Coverage

- **Login Tests** - Success, validation, visibility, forgot password
- **Signup Tests** - Success, validation, visibility
- **Page Object Model** - LoginPage.js, SignupPage.js
- **Test Data** - Centralized in testData.js
- **Error Messages** - Constants in constants.js