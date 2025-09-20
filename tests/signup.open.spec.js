// tests/signup.open.spec.js
import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test('signup modal opens and fields are visible', async ({ page }) => {
  const auth = new AuthPage(page);

  // 1) ניווט למודאל הרשמה (דרך הבית + כפתור sign-up-button)
  await auth.gotoSignup();

  // 2) אימות שהשדות המרכזיים קיימים ונראים
  await expect(auth.firstNameInput).toBeVisible();
  await expect(auth.lastNameInput).toBeVisible();
  await expect(auth.emailInputSignup).toBeVisible();
  await expect(auth.birthdayInput).toBeVisible();
  await expect(auth.passwordInputSignup).toBeVisible();
  await expect(auth.confirmPasswordInput).toBeVisible();
  await expect(auth.agreeTermsCheckbox).toBeVisible();
  await expect(auth.registerButton).toBeVisible();
});
