import { vi } from 'vitest';
import mockFetch from '../../helpers/mockFetch';
import getSearchList from '../../../helpers/getSearchList';

describe('it tests getSearchList', () =>{

  beforeAll(() =>{
    vi.clearAllMocks();
  });

  it('it should return a list of users', async () =>{
    const fakeResponse = {users: [
      {name: 'test', email: 'test@test.test'},
      {name: 'test2', email: 'test2@test.test'}
    ]};
    mockFetch(fakeResponse);

    const response = await getSearchList('test', 'accessToken', 'refreshToken');
    expect(response).toStrictEqual(fakeResponse.users);
  });
  
  it('it should return err', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse);

    const response = await getSearchList('test', 'accessToken', 'refreshToken');
    expect(response).toStrictEqual([]);
  });
  
  it('it should return server out', async () =>{
    const fakeResponse = {};
    mockFetch(fakeResponse);

    const response = await getSearchList('test', 'accessToken', 'refreshToken');
    expect(response).toStrictEqual([]);
  });
});