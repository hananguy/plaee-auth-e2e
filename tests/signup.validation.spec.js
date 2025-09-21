// tests/signup.validation.spec.js
import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import { expectErrorText } from '../utils/expecters.js';
import {
  validSignupData,
  ValidData,
  InvalidData,
} from '../utils/testData.js';
import { Errors } from '../utils/constants.js';

test.describe('signup validations – all rules', () => {
  test.beforeEach(async ({ page }) => {
    const s = new SignupPage(page);
    page.signup = s;
    await s.gotoSignup();
  });

  test('first name is required', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ firstName: InvalidData.name.firstName.empty }));
    await expectErrorText(s.firstNameError, Errors.firstNameRequired);
  });

  test('last name is required', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ lastName: InvalidData.name.lastName.empty }));
    await expectErrorText(s.lastNameError, Errors.lastNameRequired);
  });
  test('first name – letters only', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ firstName: InvalidData.name.firstName.nonLetter }));
    await expectErrorText(s.firstNameError, Errors.firstNameLettersOnly);
  });

  test('last name – letters only', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ lastName: InvalidData.name.lastName.nonLetter }));
    await expectErrorText(s.lastNameError, Errors.lastNameLettersOnly);
  });

  test('invalid email address', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ email: InvalidData.email.invalid }));
    await expectErrorText(s.emailError, Errors.invalidEmail);
  });

  test('birthday is required', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ birthday: InvalidData.birthday.empty }));
    await expectErrorText(s.birthdayError, Errors.birthdayRequired);
  });

  test('birthday wrong format (expects MM/DD/YYYY)', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ birthday: InvalidData.birthday.wrongFormat }));
    await expectErrorText(s.birthdayError, Errors.birthdayFormat);
  });

  test('age restriction – must be at least 21', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ birthday: InvalidData.birthday.under21 }));
    await expectErrorText(s.birthdayError, Errors.age21);
  });

  test('password must be at least 6 characters', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(
      validSignupData({ password: InvalidData.password.short, confirmPassword: InvalidData.password.short })
    );
    await expectErrorText(s.passwordError, Errors.passwordTooShort);
  });

  test('confirm password mismatch', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(
      validSignupData({ confirmPassword: InvalidData.password.different })
    );
    await expectErrorText(s.confirmPasswordError, Errors.confirmMismatch);
  });

  test('password must contain at least one letter', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(
      validSignupData({ password: InvalidData.password.noLetter, confirmPassword: InvalidData.password.noLetter })
    );
    await expectErrorText(s.passwordError, Errors.passwordMustContainLetter);
  });

  test('password must contain at least one special character', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(
      validSignupData({ password: InvalidData.password.noSpecial, confirmPassword: InvalidData.password.noSpecial })
    );
    await expectErrorText(s.passwordError, Errors.passwordMustContainSpecial);
  });
  test('terms must be accepted', async ({ page }) => {
    const s = page.signup;
    await s.fillAllAndSubmit(validSignupData({ agreeTerms: InvalidData.terms.notAccepted }));
    await expectErrorText(s.termsError, Errors.termsRequired);
  });
});
