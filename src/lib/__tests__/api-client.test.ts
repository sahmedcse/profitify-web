import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '../api-client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('apiClient.get', () => {
  it('calls fetch with correct URL and GET method', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ status: 'ok' }));

    await apiClient.get('/health');

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/health',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('returns parsed JSON', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ status: 'ok' }));

    const data = await apiClient.get<{ status: string }>('/health');
    expect(data).toEqual({ status: 'ok' });
  });
});

describe('apiClient.post', () => {
  it('sends JSON body', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ id: 1 }));

    await apiClient.post('/items', { name: 'test' });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/items',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'test' }),
      }),
    );
  });
});

describe('error handling', () => {
  it('throws on non-ok response with error message', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ message: 'Not found' }, 404));

    await expect(apiClient.get('/missing')).rejects.toThrow('Not found');
  });

  it('throws generic message when error body is not JSON', async () => {
    mockFetch.mockResolvedValue(new Response('Internal Server Error', { status: 500 }));

    await expect(apiClient.get('/fail')).rejects.toThrow('Request failed with status 500');
  });
});

describe('204 No Content', () => {
  it('returns undefined for 204 responses', async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 204 }));

    const result = await apiClient.delete('/items/1');
    expect(result).toBeUndefined();
  });
});
