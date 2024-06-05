import { vi } from 'vitest';

type FakeResponse = {accessToken: string} | {err: string} | {};

function mockFetch(fakeResponse: FakeResponse){
  return vi.spyOn(window, 'fetch').mockResolvedValue({json: () => Promise.resolve(fakeResponse)} as Response);
}

export default mockFetch;