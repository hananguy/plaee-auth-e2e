import { generateEmail, generateBirthdayForAge } from './testData.js';
import { generateRandomString, generateRandomNumber, formatDate } from './testHelpers.js';

/**
 * Data Factory - Generate test data dynamically
 * Provides methods to create various test data scenarios
 */

/**
 * User data factory
 */
export class UserDataFactory {
  /**
   * Generate valid user data
   * @param {Object} overrides - Data overrides
   * @returns {Object} User data object
   */
  static createValidUser(overrides = {}) {
    const baseData = {
      firstName: 'John',
      lastName: 'Doe',
      email: generateEmail(),
      password: 'ValidPass123!',
      birthday: generateBirthdayForAge(25),
      confirmPassword: 'ValidPass123!',
      agreeTerms: true,
    };
    
    return { ...baseData, ...overrides };
  }

  /**
   * Generate invalid user data for testing
   * @param {string} field - Field to make invalid
   * @returns {Object} Invalid user data
   */
  static createInvalidUser(field) {
    const validData = this.createValidUser();
    
    const invalidScenarios = {
      emptyFirstName: { ...validData, firstName: '' },
      emptyLastName: { ...validData, lastName: '' },
      invalidEmail: { ...validData, email: 'invalid-email' },
      shortPassword: { ...validData, password: '123', confirmPassword: '123' },
      passwordMismatch: { ...validData, password: 'ValidPass123!', confirmPassword: 'DifferentPass123!' },
      underage: { ...validData, birthday: generateBirthdayForAge(18) },
      noTerms: { ...validData, agreeTerms: false },
      specialCharsInName: { ...validData, firstName: 'John123', lastName: 'Doe!' },
    };
    
    return invalidScenarios[field] || validData;
  }

  /**
   * Generate login credentials
   * @param {Object} overrides - Credential overrides
   * @returns {Object} Login credentials
   */
  static createLoginCredentials(overrides = {}) {
    const baseData = {
      email: generateEmail(),
      password: 'ValidPass123!',
    };
    
    return { ...baseData, ...overrides };
  }

  /**
   * Generate invalid login credentials
   * @param {string} field - Field to make invalid
   * @returns {Object} Invalid login credentials
   */
  static createInvalidLoginCredentials(field) {
    const validData = this.createLoginCredentials();
    
    const invalidScenarios = {
      emptyEmail: { ...validData, email: '' },
      emptyPassword: { ...validData, password: '' },
      invalidEmail: { ...validData, email: 'invalid-email' },
      shortPassword: { ...validData, password: '123' },
      noLetterPassword: { ...validData, password: '123456!' },
      noNumberPassword: { ...validData, password: 'abcdef!' },
      noSpecialPassword: { ...validData, password: 'ValidPass123' },
    };
    
    return invalidScenarios[field] || validData;
  }
}

/**
 * Form data factory
 */
export class FormDataFactory {
  /**
   * Generate form data with specific validation errors
   * @param {Array<string>} errorFields - Fields to make invalid
   * @returns {Object} Form data with errors
   */
  static createFormWithErrors(errorFields = []) {
    const validData = UserDataFactory.createValidUser();
    
    errorFields.forEach(field => {
      switch (field) {
        case 'firstName':
          validData.firstName = '';
          break;
        case 'lastName':
          validData.lastName = '';
          break;
        case 'email':
          validData.email = 'invalid-email';
          break;
        case 'password':
          validData.password = '123';
          validData.confirmPassword = '123';
          break;
        case 'birthday':
          validData.birthday = '';
          break;
        case 'terms':
          validData.agreeTerms = false;
          break;
      }
    });
    
    return validData;
  }

  /**
   * Generate multiple test scenarios
   * @param {Array<string>} scenarios - Array of scenario names
   * @returns {Array<Object>} Array of test data objects
   */
  static createMultipleScenarios(scenarios) {
    return scenarios.map(scenario => {
      switch (scenario) {
        case 'valid':
          return UserDataFactory.createValidUser();
        case 'emptyFields':
          return this.createFormWithErrors(['firstName', 'lastName', 'email', 'password']);
        case 'invalidEmail':
          return this.createFormWithErrors(['email']);
        case 'shortPassword':
          return this.createFormWithErrors(['password']);
        case 'underage':
          return UserDataFactory.createInvalidUser('underage');
        case 'noTerms':
          return UserDataFactory.createInvalidUser('noTerms');
        default:
          return UserDataFactory.createValidUser();
      }
    });
  }
}

/**
 * API data factory
 */
export class ApiDataFactory {
  /**
   * Generate API request data
   * @param {string} endpoint - API endpoint
   * @param {Object} overrides - Data overrides
   * @returns {Object} API request data
   */
  static createApiRequest(endpoint, overrides = {}) {
    const baseData = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timestamp: new Date().toISOString(),
    };
    
    const endpointData = {
      '/auth/login': {
        ...baseData,
        body: UserDataFactory.createLoginCredentials(),
      },
      '/auth/register': {
        ...baseData,
        body: UserDataFactory.createValidUser(),
      },
      '/auth/forgot-password': {
        ...baseData,
        body: { email: generateEmail() },
      },
    };
    
    const requestData = endpointData[endpoint] || baseData;
    return { ...requestData, ...overrides };
  }
}

/**
 * Test scenario factory
 */
export class TestScenarioFactory {
  /**
   * Generate test scenarios for validation testing
   * @returns {Array<Object>} Array of test scenarios
   */
  static createValidationScenarios() {
    return [
      {
        name: 'valid_data',
        data: UserDataFactory.createValidUser(),
        expectedResult: 'success',
      },
      {
        name: 'empty_first_name',
        data: UserDataFactory.createInvalidUser('emptyFirstName'),
        expectedResult: 'error',
        expectedError: 'firstNameRequired',
      },
      {
        name: 'invalid_email',
        data: UserDataFactory.createInvalidUser('invalidEmail'),
        expectedResult: 'error',
        expectedError: 'invalidEmail',
      },
      {
        name: 'short_password',
        data: UserDataFactory.createInvalidUser('shortPassword'),
        expectedResult: 'error',
        expectedError: 'passwordTooShort',
      },
      {
        name: 'underage_user',
        data: UserDataFactory.createInvalidUser('underage'),
        expectedResult: 'error',
        expectedError: 'age21',
      },
    ];
  }

  /**
   * Generate edge case scenarios
   * @returns {Array<Object>} Array of edge case scenarios
   */
  static createEdgeCaseScenarios() {
    return [
      {
        name: 'very_long_name',
        data: UserDataFactory.createValidUser({
          firstName: generateRandomString(100),
          lastName: generateRandomString(100),
        }),
        expectedResult: 'error',
      },
      {
        name: 'special_characters_email',
        data: UserDataFactory.createValidUser({
          email: 'test+special@example.com',
        }),
        expectedResult: 'success',
      },
      {
        name: 'unicode_name',
        data: UserDataFactory.createValidUser({
          firstName: 'José',
          lastName: 'García',
        }),
        expectedResult: 'success',
      },
    ];
  }
}
