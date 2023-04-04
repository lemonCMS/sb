import { isNumber } from './is-number';

describe('isNumber', () => {
  it('should return true if given a number', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(-456)).toBe(true);
    expect(isNumber(0)).toBe(true);
  });

  it('should return false if given a non-number value', () => {
    expect(isNumber('hello')).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber({ prop: 'value' })).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
  });

  it('should return false if given a boolean value', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });
});
