/**
 * Checks whether a given value is a boolean or not and returns a boolean.
 * @param value - The value to check if it is a boolean.
 * @returns A boolean indicating whether the given value is a boolean(true/false) or not.
 */
export const isBoolean = (value: any): boolean => {
  // A boolean in JavaScript can only have two values, true or false.
  // This function checks if the provided value is strictly equal to either true or false.
  return value === false || value === true;
};
