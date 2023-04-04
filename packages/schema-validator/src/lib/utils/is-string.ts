/**
 * Checks whether a given value is a string or not and returns a boolean.
 * @param value - The value to check if it is a string.
 * @returns A boolean indicating whether the given value is a string or not.
 */
export const isString = (value: any): boolean => {
  return typeof value === 'string';
};
