import { expect } from '@playwright/test';

/**
 * BasePage - Abstract base class for all page objects
 * Contains common functionality and utilities
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for element to be visible
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @param {Object} options - Wait options
   * @returns {Promise<void>}
   */
  async waitForVisible(locator, options = {}) {
    await locator.waitFor({ state: 'visible', ...options });
  }

  /**
   * Wait for element to be hidden
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @param {Object} options - Wait options
   * @returns {Promise<void>}
   */
  async waitForHidden(locator, options = {}) {
    await locator.waitFor({ state: 'hidden', ...options });
  }

  /**
   * Fill input field with text
   * @param {import('@playwright/test').Locator} locator - Input locator
   * @param {string} text - Text to fill
   * @returns {Promise<void>}
   */
  async fillInput(locator, text) {
    await this.waitForVisible(locator);
    await locator.fill(text);
  }

  /**
   * Click element
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @returns {Promise<void>}
   */
  async clickElement(locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  /**
   * Check checkbox
   * @param {import('@playwright/test').Locator} locator - Checkbox locator
   * @returns {Promise<void>}
   */
  async checkCheckbox(locator) {
    await this.waitForVisible(locator);
    await locator.check();
  }

  /**
   * Wait for page to load completely
   * @returns {Promise<void>}
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot
   * @param {string} name - Screenshot name
   * @returns {Promise<Buffer>}
   */
  async takeScreenshot(name) {
    return await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   * @returns {string}
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for URL to contain specific text
   * @param {string|RegExp} urlPattern - URL pattern to wait for
   * @returns {Promise<void>}
   */
  async waitForUrl(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }

  /**
   * Scroll element into view
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @returns {Promise<void>}
   */
  async scrollIntoView(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for network response
   * @param {string} urlPattern - URL pattern to wait for
   * @returns {Promise<import('@playwright/test').Response>}
   */
  async waitForResponse(urlPattern) {
    return await this.page.waitForResponse(urlPattern);
  }
}
