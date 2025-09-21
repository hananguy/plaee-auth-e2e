/**
 * Configuration Manager - Centralized configuration management
 * Handles environment-specific settings and test configuration
 */

/**
 * Environment configuration
 */
export const Environment = {
  DEV: 'dev',
  STAGING: 'staging',
  PROD: 'prod',
  LOCAL: 'local',
};

/**
 * Browser configuration
 */
export const BrowserConfig = {
  CHROMIUM: {
    name: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
  FIREFOX: {
    name: 'firefox',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
  WEBKIT: {
    name: 'webkit',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
};

/**
 * Test configuration manager
 */
export class ConfigManager {
  constructor() {
    this.environment = process.env.NODE_ENV || Environment.LOCAL;
    this.baseUrl = this.getBaseUrl();
    this.timeouts = this.getTimeouts();
    this.retryConfig = this.getRetryConfig();
    this.testData = this.getTestDataConfig();
  }

  /**
   * Get base URL based on environment
   * @returns {string} Base URL
   */
  getBaseUrl() {
    const urls = {
      [Environment.LOCAL]: 'http://localhost:3000',
      [Environment.DEV]: 'https://dev-cms.plaee.dev',
      [Environment.STAGING]: 'https://staging-cms.plaee.dev',
      [Environment.PROD]: 'https://cms.plaee.dev',
    };
    
    return urls[this.environment] || urls[Environment.LOCAL];
  }

  /**
   * Get timeout configuration
   * @returns {Object} Timeout configuration
   */
  getTimeouts() {
    return {
      default: 30000,
      action: 60000,
      navigation: 60000,
      assertion: 10000,
      network: 30000,
    };
  }

  /**
   * Get retry configuration
   * @returns {Object} Retry configuration
   */
  getRetryConfig() {
    return {
      attempts: 2,
      delay: 1000,
      exponentialBackoff: true,
    };
  }

  /**
   * Get test data configuration
   * @returns {Object} Test data configuration
   */
  getTestDataConfig() {
    return {
      realUser: {
        email: 'yhananguy@gmail.com',
        password: 'PLEOMAX12345!',
      },
      testUsers: {
        valid: {
          email: 'test@example.com',
          password: 'TestPass123!',
        },
        invalid: {
          email: 'invalid@example.com',
          password: 'wrongpass',
        },
      },
    };
  }

  /**
   * Get browser configuration
   * @param {string} browser - Browser name
   * @returns {Object} Browser configuration
   */
  getBrowserConfig(browser = 'chromium') {
    return BrowserConfig[browser.toUpperCase()] || BrowserConfig.CHROMIUM;
  }

  /**
   * Get test tags based on environment
   * @returns {Array<string>} Test tags
   */
  getTestTags() {
    const baseTags = ['@e2e'];
    
    switch (this.environment) {
      case Environment.LOCAL:
        return [...baseTags, '@local', '@smoke'];
      case Environment.DEV:
        return [...baseTags, '@dev', '@smoke', '@regression'];
      case Environment.STAGING:
        return [...baseTags, '@staging', '@regression', '@integration'];
      case Environment.PROD:
        return [...baseTags, '@prod', '@smoke'];
      default:
        return baseTags;
    }
  }

  /**
   * Get screenshot configuration
   * @returns {Object} Screenshot configuration
   */
  getScreenshotConfig() {
    return {
      enabled: true,
      path: 'screenshots',
      fullPage: true,
      onFailure: true,
      onSuccess: false,
    };
  }

  /**
   * Get video configuration
   * @returns {Object} Video configuration
   */
  getVideoConfig() {
    return {
      enabled: this.environment !== Environment.PROD,
      path: 'videos',
      mode: 'retain-on-failure',
      size: { width: 1280, height: 720 },
    };
  }

  /**
   * Get trace configuration
   * @returns {Object} Trace configuration
   */
  getTraceConfig() {
    return {
      enabled: this.environment !== Environment.PROD,
      path: 'traces',
      mode: 'retain-on-failure',
    };
  }

  /**
   * Get report configuration
   * @returns {Object} Report configuration
   */
  getReportConfig() {
    return {
      enabled: true,
      path: 'playwright-report',
      open: this.environment === Environment.LOCAL,
    };
  }

  /**
   * Get parallel execution configuration
   * @returns {Object} Parallel configuration
   */
  getParallelConfig() {
    return {
      workers: this.environment === Environment.PROD ? 1 : 4,
      fullyParallel: true,
      forbidOnly: this.environment === Environment.PROD,
    };
  }

  /**
   * Get all configuration
   * @returns {Object} Complete configuration object
   */
  getAllConfig() {
    return {
      environment: this.environment,
      baseUrl: this.baseUrl,
      timeouts: this.timeouts,
      retry: this.retryConfig,
      testData: this.testData,
      tags: this.getTestTags(),
      screenshot: this.getScreenshotConfig(),
      video: this.getVideoConfig(),
      trace: this.getTraceConfig(),
      report: this.getReportConfig(),
      parallel: this.getParallelConfig(),
    };
  }

  /**
   * Update configuration
   * @param {Object} updates - Configuration updates
   */
  updateConfig(updates) {
    Object.assign(this, updates);
  }

  /**
   * Reset to default configuration
   */
  resetToDefault() {
    this.environment = Environment.LOCAL;
    this.baseUrl = this.getBaseUrl();
    this.timeouts = this.getTimeouts();
    this.retryConfig = this.getRetryConfig();
    this.testData = this.getTestDataConfig();
  }
}

// Export singleton instance
export const configManager = new ConfigManager();
