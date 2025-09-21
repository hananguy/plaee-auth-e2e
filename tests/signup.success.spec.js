import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { generateEmail, validPassword, validBirthday, validFirstName, validLastName } from '../utils/testData.js';

test('signup – success shows confirmation modal', async ({ page }) => {
  const signup = new SignupPage(page);
  
  await signup.gotoSignup();
   await signup.fillAndSubmit({
    firstName: validFirstName,
    lastName: validLastName,
    email: generateEmail(),
    birthday: validBirthday,
    password: validPassword,
  });
    await signup.ConfirmationDialogShown();
})