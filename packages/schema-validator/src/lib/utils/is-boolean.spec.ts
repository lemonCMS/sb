import { isBoolean } from './is-boolean';

describe('isBoolean()', () => {
  it('returns true for true', () => {
    const result = isBoolean(true);
    expect(result).toBe(true);
  });

  it('returns true for false', () => {
    const result = isBoolean(false);
    expect(result).toBe(true);
  });

  it('returns false for non-booleans', () => {
    const result1 = isBoolean(0);
    expect(result1).toBe(false);

    const result2 = isBoolean('true');
    expect(result2).toBe(false);

    const result3 = isBoolean(null);
    expect(result3).toBe(false);

    const result4 = isBoolean(undefined);
    expect(result4).toBe(false);

    const result5 = isBoolean({});
    expect(result5).toBe(false);
  });
});
