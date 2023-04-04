import { isObjectLiteral } from './is-object-literal';

describe('isObjectLiteral', () => {
  it('should return true for empty object', () => {
    expect(isObjectLiteral({})).toBe(true);
  });

  it('should return true for non-empty object', () => {
    expect(isObjectLiteral({ name: 'John', age: 30 })).toBe(true);
  });

  it('should return false for arrays', () => {
    expect(isObjectLiteral([])).toBe(false);
    expect(isObjectLiteral([1, 2, 3])).toBe(false);
  });

  it('should return false for null and undefined', () => {
    expect(isObjectLiteral(undefined)).toBe(false);
    expect(isObjectLiteral(null)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isObjectLiteral(123)).toBe(false);
    expect(isObjectLiteral('hello')).toBe(false);
    expect(isObjectLiteral(true)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(
      isObjectLiteral(() => {
        //
      }),
    ).toBe(false);
    expect(
      isObjectLiteral(function () {
        //
      }),
    ).toBe(false);
  });

  it('should return false for classes', () => {
    expect(isObjectLiteral(class MyClass {})).toBe(false);
  });

  it('should return false for instances of classes', () => {
    expect(isObjectLiteral(new Date())).toBe(false);
    expect(isObjectLiteral(new RegExp('^abc$'))).toBe(false);
  });
});
