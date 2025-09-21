import 'dotenv/config'; 
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validLoginEmail, validLoginPassword } from "../utils/testData";

test('login – success closes the login modal', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoLogin();
//   await login.fillAndSubmit({ email: validLoginEmail, password: validLoginPassword });
 await Promise.all([
    login.waitForAuthResponse(),                 
    login.fillAndSubmit({ email: validLoginEmail, password: validLoginPassword }), 
  ]);

// await expect(login.loginForm).toBeHidden({ timeout: 10_000 });
await login.expectLoggedIn();
})