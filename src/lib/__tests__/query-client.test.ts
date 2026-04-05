import { describe, it, expect } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { makeQueryClient } from '../query-client';

describe('makeQueryClient', () => {
  it('returns a QueryClient instance', () => {
    const client = makeQueryClient();
    expect(client).toBeInstanceOf(QueryClient);
  });

  it('sets staleTime to 30 seconds', () => {
    const client = makeQueryClient();
    expect(client.getDefaultOptions().queries?.staleTime).toBe(30_000);
  });

  it('sets gcTime to 5 minutes', () => {
    const client = makeQueryClient();
    expect(client.getDefaultOptions().queries?.gcTime).toBe(300_000);
  });

  it('sets retry to 2', () => {
    const client = makeQueryClient();
    expect(client.getDefaultOptions().queries?.retry).toBe(2);
  });

  it('creates a new instance each call', () => {
    const a = makeQueryClient();
    const b = makeQueryClient();
    expect(a).not.toBe(b);
  });
});
