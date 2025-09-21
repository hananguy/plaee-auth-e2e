import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('login modal opens and required fields are visible', async ({ page }) => {
  const login = new LoginPage(page);
  await login.gotoLogin();
  await login.expectBaseElementsVisible();
});