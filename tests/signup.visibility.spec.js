import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignUpPage';

test('signup modal – all elements visible', async ({ page }) => {
  const signup = new SignupPage(page);
  await signup.gotoSignup();
  await signup.expectAllElementsVisible();
});