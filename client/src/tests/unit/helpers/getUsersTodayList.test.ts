import { vi } from 'vitest';

import mockFetch from '../../helpers/mockFetch';

import getUsersTodayList from '../../../helpers/getUsersTodayList';

describe('it tests getUsersTodayList', () =>{

  beforeEach(() =>{
    vi.clearAllMocks();
  });

  it('should return today list', async () =>{
    const fakeResponse = {todayUsers: [
      {name: 'test', email: 'test@test.test'},
      {name: 'test2', email: 'test2@test.test'}
    ]};
    mockFetch(fakeResponse)

    const response = await getUsersTodayList('accessToken', 'refreshToken');
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return err', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse)

    const response = await getUsersTodayList('accessToken', 'refreshToken');
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return server out', async () =>{
    const fakeResponse = {};
    mockFetch(fakeResponse)

    const response = await getUsersTodayList('accessToken', 'refreshToken');
    expect(response).toStrictEqual({err: 'server out'});
  });
});