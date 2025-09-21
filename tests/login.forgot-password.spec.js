// tests/login.forgot-password.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import {
  validLoginData,
  InvalidData,
} from '../utils/testData.js';

test.describe('forgot password functionality', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    page.login = login;
    await login.gotoLogin();
  });

  test('forgot password link opens password recovery form', async ({ page }) => {
    const login = page.login;
    await login.openForgotPassword();
    await expect(login.passwordRecoverEmailInput).toBeVisible();
  });

  test('forgot password form is accessible', async ({ page }) => {
    const login = page.login;
    await login.openForgotPassword();
    await expect(login.passwordRecoverEmailInput).toBeVisible();
    await expect(login.passwordRecoverEmailInput).toBeEnabled();
  });

  test('user leaves fields empty then clicks forgot password', async ({ page }) => {
    const login = page.login;
    
    // Try to login with empty fields
    await login.fillAndSubmit(validLoginData({ email: InvalidData.email.empty, password: InvalidData.password.empty }));
    
    // Wait for error messages
    await expect(login.emailError).toBeVisible();
    await expect(login.passwordError).toBeVisible();
    
    // Then click forgot password
    await login.openForgotPassword();
    await expect(login.passwordRecoverEmailInput).toBeVisible();
  });
});
