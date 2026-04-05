import { describe, it, expect } from 'vitest';
import { SITE_NAME, SITE_URL, API_URL, APP_ENV, IS_PRODUCTION } from '../constants';

describe('constants', () => {
  it('exports SITE_NAME', () => {
    expect(SITE_NAME).toBe('Profitify');
  });

  it('defaults SITE_URL to localhost:3000', () => {
    expect(SITE_URL).toBe('http://localhost:3000');
  });

  it('defaults API_URL to localhost:8080', () => {
    expect(API_URL).toBe('http://localhost:8080');
  });

  it('defaults APP_ENV to development', () => {
    expect(APP_ENV).toBe('development');
  });

  it('IS_PRODUCTION is false in test', () => {
    expect(IS_PRODUCTION).toBe(false);
  });
});
