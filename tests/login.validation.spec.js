// tests/login.validation.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { expectErrorText } from '../utils/expecters.js';
import {
  validLoginData,
  InvalidData,
} from '../utils/testData.js';
import { Errors } from '../utils/constants.js';

test.describe('login validations – all rules', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    page.login = login;
    await login.gotoLogin();
  });

  test('email is required', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ email: InvalidData.email.empty }));
    await expectErrorText(login.emailError, Errors.emailRequired);
  });

  test('password is required', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ password: InvalidData.password.empty }));
    await expectErrorText(login.passwordError, Errors.passwordRequired);
  });

  test('invalid email format - missing @', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ email: InvalidData.email.invalid }));
    await expectErrorText(login.emailError, Errors.invalidEmailFormat);
  });

  test('password too short - less than 6 characters', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ password: InvalidData.password.short }));
    await expectErrorText(login.passwordError, Errors.passwordTooShortLogin);
  });

  test('password must contain at least one letter', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ password: InvalidData.password.noLetter }));
    await expectErrorText(login.passwordError, Errors.passwordMustContainLetter);
  });

  test('password must contain at least one number', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ password: InvalidData.password.noNumber }));
    await expectErrorText(login.passwordError, Errors.passwordMustContainNumber);
  });

  test('password must contain at least one special character', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ password: InvalidData.password.noSpecial }));
    await expectErrorText(login.passwordError, Errors.passwordMustContainSpecialLogin);
  });


  test('both email and password are required', async ({ page }) => {
    const login = page.login;
    await login.fillAndSubmit(validLoginData({ email: InvalidData.email.empty, password: InvalidData.password.empty }));
    await expectErrorText(login.emailError, Errors.emailRequired);
    await expectErrorText(login.passwordError, Errors.passwordRequired);
  });

  test('error messages clear after correction', async ({ page }) => {
    const login = page.login;
    
    // First, trigger email error
    await login.fillAndSubmit(validLoginData({ email: InvalidData.email.empty }));
    await expectErrorText(login.emailError, Errors.emailRequired);
    
    // Then correct the email and verify error clears
    await login.emailInput.waitFor({ state: 'visible' });
    await login.emailInput.fill(validLoginData().email);
    await login.submitButton.waitFor({ state: 'visible' });
    await login.submitButton.click();
    
    // Error should be cleared (element should not be visible or have different text)
    await login.emailError.waitFor({ state: 'hidden' });
  });
});
