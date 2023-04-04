import { isArray } from './is-array';

describe('isArray', () => {
  it('returns true when given an array', () => {
    const result = isArray([]);
    expect(result).toBe(true);
  });

  it('returns false when given a non-array value', () => {
    const result1 = isArray(null);
    const result2 = isArray(42);
    const result3 = isArray('foo');
    const result4 = isArray({ key: 'value' });

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  it('returns false when given undefined', () => {
    const result = isArray(undefined);
    expect(result).toBe(false);
  });
});
