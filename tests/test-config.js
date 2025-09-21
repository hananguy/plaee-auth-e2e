/**
 * Test Configuration
 * Centralized configuration for test execution
 */

export const TestConfig = {
  // Timeouts
  DEFAULT_TIMEOUT: 30000,
  NAVIGATION_TIMEOUT: 60000,
  ACTION_TIMEOUT: 60000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 2,
  
  // Test data
  TEST_USER: {
    email: 'yhananguy@gmail.com',
    password: 'PLEOMAX12345!',
  },
  
  // URLs
  BASE_URL: 'https://dev-cms.plaee.dev',
  HOME_PAGE: '/home',
  LOBBY_PAGE: '/lobby',
  
  // Test tags
  TAGS: {
    SMOKE: '@smoke',
    REGRESSION: '@regression',
    E2E: '@e2e',
    VALIDATION: '@validation',
  },
};
