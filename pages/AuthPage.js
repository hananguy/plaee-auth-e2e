import { expect } from '@playwright/test';

class AuthPage {
  constructor(page) {
    this.page = page;

    // --- Signup selectors ---
    this.firstNameInput = page.getByTestId('firstName-input');
    this.lastNameInput = page.getByTestId('lastName-input');
    this.emailInputSignup = page.getByTestId('email-input');
    this.birthdayInput = page.getByTestId('birthday-input');
    this.passwordInputSignup = page.getByTestId('password-input');
    this.confirmPasswordInput = page.getByTestId('confirmPassword-input');
    this.agreeTermsCheckbox = page.getByTestId('agreeTerms-checkbox');
    this.registerButton = page.getByTestId('register-button');
    this.facebookRegisterButton = page.getByTestId('facebook-register-button');
    this.googleRegisterButton = page.getByTestId('google-register-button');
    this.loginLink = page.getByTestId('login-link');

    // --- Login selectors ---
    this.emailInputLogin = page.getByTestId('email-input');
    this.passwordInputLogin = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-form').getByTestId('login-button');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
    this.signupLink = page.getByTestId('sign-up-link');
    this.facebookLoginButton = page.getByTestId('facebook-login-button');
    this.googleLoginButton = page.getByTestId('google-login-button');

    this.openLoginButton = page.getByTestId('login-button');
    this.openSignupButton = page.getByTestId('sign-up-button');

    // --- Logged-in indicator ---
    this.userMenu = page.getByTestId('user-menu');
  }

  // --- Actions for Signup ---
 async gotoSignup() {
  await this.page.goto('/home');    
  await this.openSignupButton.waitFor({ state: 'visible' });          
  await this.openSignupButton.click();        
  await this.firstNameInput.waitFor({ state: 'visible' });    
}

  async signup({ firstName, lastName, email, birthday, password }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInputSignup.fill(email);
    await this.birthdayInput.fill(birthday);
    await this.passwordInputSignup.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.agreeTermsCheckbox.check();
    await this.registerButton.click();
  }

  // --- Actions for Login ---
  async gotoLogin() {
  await this.page.goto('/home');
  await this.openLoginButton.click();         
  await this.emailInputLogin.waitFor();       
}

  async fillAndSubmit({ email, password }) {
    await this.emailInputLogin.fill(email);
    await this.passwordInputLogin.fill(password);
    await this.loginButton.click();
  }

  // --- Validation: assert user logged in ---
  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/home/); // URL של דף הבית
    await expect(this.userMenu).toBeVisible(); // אלמנט שמופיע רק אחרי Login
  }

    makeUniqueEmail(prefix = 'qa') {
    return `${prefix}+${Date.now()}@example.com`;
  }
}

module.exports = { AuthPage };
