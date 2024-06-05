import { vi } from 'vitest';
import jwt from 'jsonwebtoken';

import mockFetch from '../../helpers/mockFetch';

import getAccessToken from '../../../helpers/getAccessToken';

describe('it tests getAccessToken', () =>{
  const refreshToken = jwt.sign({name: 'test'}, 'test');
  
  beforeEach(() =>{
    vi.clearAllMocks();
  });
  
  it('should return access token', async () =>{
    const fakeResponse = {accessToken: 'accessToken'};
    mockFetch(fakeResponse);
    
    const response = await getAccessToken(refreshToken);
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should error', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse);

    const response = await getAccessToken('');
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return server out', async () =>{
    const fakeResponse = {};
    mockFetch(fakeResponse);

    const response = await getAccessToken('');
    expect(response).toStrictEqual({err: 'server out'});
  });
});