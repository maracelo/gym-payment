import { vi } from 'vitest';

import mockFetch from '../../helpers/mockFetch';

import getUsersLateList from '../../../helpers/getUsersLateList';

describe('it tests getUsersLateList', () =>{

  beforeEach(() =>{
    vi.clearAllMocks();
  });

  it('should return late list', async () =>{
    const fakeResponse = {lateUsers: [
      {name: 'test', email: 'test@test.test'},
      {name: 'test2', email: 'test2@test.test'}
    ]};
    mockFetch(fakeResponse)

    const response = await getUsersLateList('accessToken', 'refreshToken');
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return err', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse)

    const response = await getUsersLateList('accessToken', 'refreshToken');
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return server out', async () =>{
    const fakeResponse = {};
    mockFetch(fakeResponse)

    const response = await getUsersLateList('accessToken', 'refreshToken');
    expect(response).toStrictEqual({err: 'server out'});
  });
});