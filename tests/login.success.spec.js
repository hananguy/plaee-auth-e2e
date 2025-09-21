import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RealLoginData } from '../utils/testData.js';

test.describe('Login Success Flow', () => {
  test('should successfully login and redirect to lobby', async ({ page }) => {
    const login = new LoginPage(page);

    // Navigate to login page
    await login.gotoLogin();
    
    // Perform login with valid credentials
    await Promise.all([
      login.waitForAuthResponse(),                 
      login.fillAndSubmit({ 
        email: RealLoginData.email, 
        password: RealLoginData.password 
      }), 
    ]);

    // Verify successful login
    await login.expectLoggedIn();
  });
});