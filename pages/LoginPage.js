import { expect } from "@playwright/test";
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Open modal
    this.openLoginButton = page.getByTestId('login-button');

    // Form
    this.loginForm = page.locator('.auth-page')
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = this.loginForm.getByTestId('login-button');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
    this.signupLink = page.getByTestId('sign-up-link');
    this.facebookLoginButton = page.getByTestId('facebook-login-button');
    this.googleLoginButton = page.getByTestId('google-login-button');
    
    // Error locators
    this.emailError = page.getByTestId('email-error');
    this.passwordError = page.getByTestId('password-error');
    this.generalError = page.getByTestId('general-error');
    
    // Forgot password locators
    this.passwordRecoverEmailInput = page.getByTestId('password-recover-email-input');
  }

    async gotoLogin() {
    await this.page.goto('/home');
    await this.openLoginButton.waitFor({ state: 'visible' });
    await this.openLoginButton.click()       
    await this.emailInput.waitFor({ state: 'visible' });     
  }
  
    async fillAndSubmit({ email, password }) {
      await this.emailInput.waitFor({ state: 'visible' });
      await this.emailInput.fill(email);
      
      await this.passwordInput.waitFor({ state: 'visible' });
      await this.passwordInput.fill(password);
      
      await this.submitButton.waitFor({ state: 'visible' });
      await this.submitButton.click();
    }
    async expectBaseElementsVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signupLink).toBeVisible();
    await expect(this.facebookLoginButton).toBeVisible();
    await expect(this.googleLoginButton).toBeVisible();
    }
      async waitForAuthResponse() {
    const resp = await this.page.waitForResponse(r => {
      return r.url().includes('auth') && r.status() === 200;
    }, { timeout: 10_000 });

    return resp;
  }
    
    // Validation: assert user logged in 
    async expectLoggedIn() {
      await expect(this.page).toHaveURL(/lobby/); 
      await expect(this.loginForm).toBeHidden({ timeout: 10_000 });
    }

    // Forgot password method
    async openForgotPassword() {
      await this.forgotPasswordLink.waitFor({ state: 'visible' });
      await this.forgotPasswordLink.click();
      await this.passwordRecoverEmailInput.waitFor({ state: 'visible' });
    }

}