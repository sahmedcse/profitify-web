import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatPercent } from '../utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'end')).toBe('base end');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats negative values', () => {
    expect(formatCurrency(-500)).toBe('-$500.00');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('supports custom currency', () => {
    expect(formatCurrency(100, 'EUR', 'de-DE')).toContain('100,00');
  });
});

describe('formatPercent', () => {
  it('adds + prefix for positive values', () => {
    expect(formatPercent(5.5)).toBe('+5.50%');
  });

  it('keeps - prefix for negative values', () => {
    expect(formatPercent(-3.2)).toBe('-3.20%');
  });

  it('formats zero as positive', () => {
    expect(formatPercent(0)).toBe('+0.00%');
  });

  it('supports custom decimal places', () => {
    expect(formatPercent(12.3456, 1)).toBe('+12.3%');
  });
});
