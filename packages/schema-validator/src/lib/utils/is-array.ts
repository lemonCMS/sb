/**
 * This function checks whether a given value is an array or not and returns a boolean.
 * @param value - The value to check if it is a array.
 * @returns A boolean indicating whether the given value is a array or not.
 */
export const isArray = (value: any): boolean => {
  // The Array.isArray() method returns true if the argument passed to it is an array, otherwise it returns false.
  return Array.isArray(value);
};
