/**
 * Checks whether a given value is a number or not and returns a boolean.
 * @param value - The value to check if it is a number.
 * @returns A boolean indicating whether the given value is a number or not.
 */
export const isNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};
