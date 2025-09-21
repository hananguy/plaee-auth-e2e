import { expect } from "@playwright/test";
import { TestConfig } from '../tests/test-config.js';
export class SignupPage {
  constructor(page) {
    this.page = page;

    // Open modal
    this.openSignupButton = page.getByTestId('sign-up-button');

    // Form fields
    this.firstNameInput = page.getByTestId('firstName-input');
    this.lastNameInput = page.getByTestId('lastName-input');
    this.emailInput = page.getByTestId('email-input');
    this.birthdayInput = page.getByTestId('birthday-input');
    this.passwordInput = page.getByTestId('password-input');
    this.confirmPasswordInput = page.getByTestId('confirmPassword-input');
    this.agreeTermsCheckbox = page.getByTestId('agreeTerms-checkbox');
    this.registerButton = page.getByTestId('register-button');
    this.facebookRegisterButton = this.page.getByTestId('facebook-register-button');
    this.googleRegisterButton = this.page.getByTestId('google-register-button');
    this.loginLink = this.page.getByTestId('login-link');
    this.confirmationDialog = page.getByRole('dialog');
    this.firstNameError = page.getByTestId('firstName-error');
    this.lastNameError = page.getByTestId('lastName-error');
    this.emailError = page.getByTestId('email-error');
    this.birthdayError = page.getByTestId('birthday-error');
    this.passwordError = page.getByTestId('password-error');
    this.confirmPasswordError = page.getByTestId('confirmPassword-error');
    this.termsError = page.getByText('You must agree to the terms', { exact: false });
  }

  async gotoSignup() {
    await this.page.goto(TestConfig.HOME_PAGE);
    await this.openSignupButton.waitFor({ state: 'visible' });
    await this.openSignupButton.click();
    await this.firstNameInput.waitFor({ state: 'visible' });
  }


 async fillAndSubmit({ firstName, lastName, email, birthday, password }) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
    
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);
    
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    
    await this.birthdayInput.waitFor({ state: 'visible' });
    await this.birthdayInput.fill(birthday);
    
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    
    await this.confirmPasswordInput.waitFor({ state: 'visible' });
    await this.confirmPasswordInput.fill(password);
    
    await this.agreeTermsCheckbox.waitFor({ state: 'visible' });
    await this.agreeTermsCheckbox.check();
    
    await this.registerButton.waitFor({ state: 'visible' });
    await this.registerButton.click();
  }

async expectAllElementsVisible() {
  await expect(this.firstNameInput).toBeVisible();
  await expect(this.lastNameInput).toBeVisible();
  await expect(this.emailInput).toBeVisible();
  await expect(this.birthdayInput).toBeVisible();
  await expect(this.passwordInput).toBeVisible();
  await expect(this.confirmPasswordInput).toBeVisible();
  await expect(this.agreeTermsCheckbox).toBeVisible();
  await expect(this.registerButton).toBeVisible();
  await expect(this.facebookRegisterButton).toBeVisible();
  await expect(this.googleRegisterButton).toBeVisible();
  await expect(this.loginLink).toBeVisible();
}

  async ConfirmationDialogShown() {
  await expect(this.confirmationDialog).toBeVisible();
}
async fillAllAndSubmit({
    firstName = '',
    lastName = '',
    email = '',
    birthday = '',
    password = '',
    confirmPassword = '',
    agreeTerms = false,
  }) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);
    
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);
    
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    
    await this.birthdayInput.waitFor({ state: 'visible' });
    await this.birthdayInput.fill(birthday);
    
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    
    await this.confirmPasswordInput.waitFor({ state: 'visible' });
    await this.confirmPasswordInput.fill(confirmPassword);

    await this.agreeTermsCheckbox.waitFor({ state: 'visible' });
    if (agreeTerms) {
      await this.agreeTermsCheckbox.check();
    } else {
      if (await this.agreeTermsCheckbox.isChecked()) {
        await this.agreeTermsCheckbox.uncheck();
      }
    }

    await this.registerButton.waitFor({ state: 'visible' });
    await this.registerButton.click();
  }

}