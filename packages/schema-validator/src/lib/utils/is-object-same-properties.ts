/**
 * Checks whether two objects have the same set of properties.
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns A boolean indicating whether the two objects have the same set of properties or not.
 */
export const isObjectSameProperties = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
  const obj1Keys: string[] = Object.keys(obj1);
  const obj2Keys: string[] = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  return obj1Keys.every((key: string): boolean => obj2Keys.includes(key));
};
