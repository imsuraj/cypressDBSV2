// Helper function to parse currency strings
export const parseCurrency = (value) => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('Invalid type: value should be a string or a number.');
  }
  value = value.toString().replace(/,/g, '');
  return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
};

// Format function, if not already defined
export const formatToDecimalPlacesAsPerSettings = (value) => {
  return parseFloat(value).toFixed(Cypress.env('amountDecimalPrecision'));
};

// Utility function for parsing and rounding to two decimal places
export const parseAndFormat = (value) =>
  parseFloat(formatToDecimalPlacesAsPerSettings(parseCurrency(value)));

// Helper to check approximate equality within a tolerance
export const expectApproxEqual = (actual, expected, tolerance = 0.01) => {
  expect(Math.abs(actual - expected)).to.be.lessThan(
    tolerance,
    `Expected ${actual} to approximately equal ${expected}`
  );
};
