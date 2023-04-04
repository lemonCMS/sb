import { isObjectSameProperties } from './is-object-same-properties';

describe('isObjectSameProperties', () => {
  it('returns true for two objects with the same properties', () => {
    const obj1 = { name: 'John', age: 30 };
    const obj2 = { name: 'Jane', age: 25 };

    expect(isObjectSameProperties(obj1, obj2)).toBe(true);
  });

  it('returns false for two objects with different properties', () => {
    const obj1 = { name: 'John', age: 30 };
    const obj2 = { name: 'Jane', gender: 'female' };

    expect(isObjectSameProperties(obj1, obj2)).toBe(false);
  });

  it('returns false for two objects with different number of properties', () => {
    const obj1 = { name: 'John', age: 30 };
    const obj2 = { name: 'John', age: 25, gender: 'male' };

    expect(isObjectSameProperties(obj1, obj2)).toBe(false);
  });

  it('handles empty objects correctly', () => {
    const obj1 = {};
    const obj2 = {};

    expect(isObjectSameProperties(obj1, obj2)).toBe(true);
  });
});
