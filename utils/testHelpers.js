import { expect } from '@playwright/test';

/**
 * Test Helpers - Utility functions for common test operations
 */

/**
 * Wait for element to be visible and enabled
 * @param {import('@playwright/test').Locator} locator - Element locator
 * @param {Object} options - Wait options
 * @returns {Promise<void>}
 */
export const waitForElementReady = async (locator, options = {}) => {
  await locator.waitFor({ state: 'visible', ...options });
  await expect(locator).toBeEnabled();
};

/**
 * Clear and fill input field
 * @param {import('@playwright/test').Locator} locator - Input locator
 * @param {string} text - Text to fill
 * @returns {Promise<void>}
 */
export const clearAndFill = async (locator, text) => {
  await locator.waitFor({ state: 'visible' });
  await locator.clear();
  await locator.fill(text);
};

/**
 * Wait for multiple elements to be visible
 * @param {Array<import('@playwright/test').Locator>} locators - Array of locators
 * @returns {Promise<void>}
 */
export const waitForAllVisible = async (locators) => {
  await Promise.all(locators.map(locator => locator.waitFor({ state: 'visible' })));
};

/**
 * Check if element exists without throwing error
 * @param {import('@playwright/test').Locator} locator - Element locator
 * @returns {Promise<boolean>}
 */
export const elementExists = async (locator) => {
  try {
    await locator.waitFor({ state: 'visible', timeout: 1000 });
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate random string
 * @param {number} length - String length
 * @returns {string}
 */
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export const generateRandomNumber = (min = 1, max = 1000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Format date for input fields
 * @param {Date} date - Date object
 * @param {string} format - Date format (MM/DD/YYYY, YYYY-MM-DD, etc.)
 * @returns {string}
 */
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  switch (format) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${month}/${day}/${year}`;
  }
};

/**
 * Calculate age from birthday
 * @param {string} birthday - Birthday in MM/DD/YYYY format
 * @returns {number}
 */
export const calculateAge = (birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Generate birthday for specific age
 * @param {number} age - Desired age
 * @returns {string}
 */
export const generateBirthdayForAge = (age) => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid month-end issues
  
  return formatDate(new Date(birthYear, month - 1, day));
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<any>}
 */
export const retry = async (fn, maxAttempts = 3, delay = 1000) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

/**
 * Wait for network to be idle
 * @param {import('@playwright/test').Page} page - Page object
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<void>}
 */
export const waitForNetworkIdle = async (page, timeout = 30000) => {
  await page.waitForLoadState('networkidle', { timeout });
};

/**
 * Take screenshot with timestamp
 * @param {import('@playwright/test').Page} page - Page object
 * @param {string} name - Screenshot name
 * @returns {Promise<Buffer>}
 */
export const takeTimestampedScreenshot = async (page, name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return await page.screenshot({ 
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
};
