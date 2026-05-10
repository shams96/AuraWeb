import { describe, it, expect } from 'vitest';
import { currency } from './index';

describe('currency utilities', () => {
  it('formats USD correctly', () => {
    expect(currency.format(10)).toBe('$10.00');
    expect(currency.format(59.99)).toBe('$59.99');
    expect(currency.format(1234.56)).toBe('$1,234.56');
  });

  it('handles zero and negative amounts', () => {
    expect(currency.format(0)).toBe('$0.00');
    expect(currency.format(-5)).toBe('-$5.00');
  });
});
