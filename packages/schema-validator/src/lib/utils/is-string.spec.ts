import { isString } from './is-string';

describe('isString', () => {
  it('should return true if the value is a string', () => {
    expect(isString('hello')).toBe(true);
  });

  it('should return false if the value is not a string', () => {
    expect(isString(123)).toBe(false);
    expect(isString(['a', 'b', 'c'])).toBe(false);
    expect(isString({ name: 'John' })).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(false)).toBe(false);
  });
});
