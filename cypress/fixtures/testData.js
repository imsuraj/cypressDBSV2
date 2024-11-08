import { faker } from '@faker-js/faker';

function generateMobileNumber(min = 100000, max = 999999) {
  const prefix = '9851';
  const suffix = faker.number.int({ min: 100000, max: 999999 }); // Generates 6 random digits
  return `${prefix}${suffix}`;
}

export const createCustomerLedgerValidationCases = {
  // Boundary Tests
  minValues: {
    customerLedgerName: faker.person.fullName(),
    associateSubLedger: 'acc test',
    panNumber: faker.finance.accountNumber({ length: 9 }),
    openingBalanceType: faker.helpers.arrayElement(['Debit', 'Credit']),
    openingBalance: 2000.0, // Minimum valid opening balance
    email: faker.internet.email(),
    mobileNumber: generateMobileNumber(),
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement(['Kathmandu', 'Pokhara', 'Patan']),
    area: faker.helpers.arrayElement(['Kalanki', 'Kupondole', 'Lazimpat']),
    salesPerson: faker.helpers.arrayElement(['Bhishan Thapa', 'Shanti Singh']),
    creditLimit: 5000, // Minimum valid credit limit
    creditDay: 7, // Minimum valid credit day
    billingAddress: faker.location.streetAddress(),
    shippingAddress: faker.location.streetAddress(),
  },
  maxValues: {
    customerLedgerName: faker.person.fullName(),
    associateSubLedger: 'acc test',
    panNumber: faker.finance.accountNumber({ length: 9 }),
    openingBalanceType: faker.helpers.arrayElement(['Debit', 'Credit']),
    openingBalance: 4000.0, // Maximum valid opening balance
    email: faker.internet.email(),
    mobileNumber: generateMobileNumber(),
    address: faker.location.streetAddress(),
    city: faker.helpers.arrayElement(['Kathmandu', 'Pokhara', 'Patan']),
    area: faker.helpers.arrayElement(['Kalanki', 'Kupondole', 'Lazimpat']),
    salesPerson: faker.helpers.arrayElement(['Bhishan Thapa', 'Shanti Singh']),
    creditLimit: 10000, // Maximum valid credit limit
    creditDay: 14, // Maximum valid credit day
    billingAddress: faker.location.streetAddress(),
    shippingAddress: faker.location.streetAddress(),
  },

  exceedMaxValues: {
    customerLedgerName: faker.lorem.paragraph(5),
    associateSubLedger: 'acc test',
    panNumber: faker.finance.accountNumber({ length: 10 }),
    openingBalanceType: faker.helpers.arrayElement(['Debit', 'Credit']),
    openingBalance: faker.datatype.number({
      min: 1000000000,
      max: 5000000000,
      precision: 0.01,
    }), // Exceeding 1 Billion
    email: faker.internet.email(),
    mobileNumber: generateMobileNumber(1000000, 9999999),
    address: faker.lorem.paragraph(4),
    city: faker.lorem.words(20),
    area: faker.helpers.arrayElement(['Kalanki', 'Kupondole', 'Lazimpat']),
    salesPerson: faker.helpers.arrayElement(['Bhishan Thapa', 'Shanti Singh']),
    creditLimit: faker.datatype.number({ min: 10000000, max: 20000000 }), // Exceeding 5 Million, up to 20 Million
    creditDay: faker.datatype.number({ min: 366, max: 730 }), // Exceeding 365 days (more than 2 years)
    billingAddress: faker.lorem.paragraph(4),
    shippingAddress: faker.lorem.paragraph(4),
  },

  // Below Minimum Values
  belowMinValues: {
    openingBalance: 1999.99, // Below min for openingBalance
    creditLimit: 4999, // Below min for creditLimit
    creditDay: 6, // Below min for creditDay
  },

  // Above Maximum Values
  aboveMaxValues: {
    openingBalance: 4000.01, // Above max for openingBalance
    creditLimit: 10001, // Above max for creditLimit
    creditDay: 15, // Above max for creditDay
  },

  // Invalid Format and Type Tests
  invalidFormats: {
    email: 'invalid-email-format', // Invalid email format
    mobileNumber: 'abc123', // Invalid mobile number
    panNumber: '123ABCD!', // Invalid PAN format
  },

  // Required Fields Empty
  emptyFields: {
    customerLedgerName: '', // Empty required field
    panNumber: '', // Empty required field
    email: '', // Empty required field
    openingBalance: '', // Empty numeric field
    creditLimit: '', // Empty numeric field
    creditDay: '', // Empty numeric field
  },
};
