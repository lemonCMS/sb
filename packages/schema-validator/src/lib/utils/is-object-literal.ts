/**
 * Checks whether a value is an object and not an array.
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is an object or not.
 */
export const isObjectLiteral = (value: any): boolean => {
  if (value === null) {
    return false;
  }

  return typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype && !Array.isArray(value);
};
