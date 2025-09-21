import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import { validSignupData, ValidData } from '../utils/testData.js';

test.describe('Signup Success Flow', () => {
  test('should successfully signup and show confirmation modal', async ({ page }) => {
    const signup = new SignupPage(page);
    
    // Navigate to signup page
    await signup.gotoSignup();
    
    // Fill and submit signup form with valid data
    await signup.fillAndSubmit(validSignupData());
    
    // Verify confirmation dialog is shown
    await signup.ConfirmationDialogShown();
  });
});