/**
 * Generate unique email for testing
 * @param {string} prefix - Email prefix (default: 'plaee')
 * @returns {string} Unique email address
 */
export const generateEmail = (prefix = 'plaee') =>
  `${prefix}+${Date.now()}@example.com`;

/**
 * Real login credentials for actual system testing
 * These credentials exist in the test environment
 */
export const RealLoginData = {
  email: 'yhananguy@gmail.com',
  password: 'PLEOMAX12345!',
};

// Valid test data
export const ValidData = {
  password: 'Qwe123!',
  birthday: '01/15/1995',
  firstName: 'Guy',
  lastName: 'Tester',
  email: generateEmail(),
};

// Invalid test data
export const InvalidData = {
  // Email validation
  email: {
    invalid: 'invalid-email',
    empty: ''
  },
  
  // Password validation
  password: {
    empty: '',
    short: '12345',
    noLetter: '1234567',
    noNumber: 'abcdefg!',
    noSpecial: 'Qwe12345',
    different: 'Different123!',
  },
  
  // Name validation
  name: {
    firstName: {
      nonLetter: 'John3',
    },
    lastName: {
      nonLetter: 'Doe!',
    },
  },
  
  // Birthday validation
  birthday: {
    empty: '',
    wrongFormat: '15/01/19',
    under21: birthdayForAge(18),
  },
  
  // Terms validation
  terms: {
    notAccepted: false,
  },
};

export function birthdayForAge(ageYears) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - ageYears);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
export const under21Birthday = birthdayForAge(18);

export const validSignupData = (overrides = {}) => ({
  firstName: ValidData.firstName,
  lastName: ValidData.lastName,
  email: generateEmail(),
  birthday: ValidData.birthday,
  password: ValidData.password,
  confirmPassword: ValidData.password,
  agreeTerms: true,
  ...overrides,
});

export const validLoginData = (overrides = {}) => ({
  email: generateEmail(),
  password: ValidData.password,
  ...overrides,
});