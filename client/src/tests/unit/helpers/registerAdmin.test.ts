import { vi } from "vitest"; 

import mockFetch from "../../helpers/mockFetch";

import registerAdmin from "../../../helpers/registerAdmin";

describe('it tests registerAdmin', () =>{

  beforeAll(() =>{
    vi.clearAllMocks();
  });
  
  it('should return refresh and access tokens', async () =>{
    const fakeResponse = {refreshToken: 'refreshToken', accessToken: 'accessToken'}
    mockFetch(fakeResponse);

    const response = await registerAdmin({
      name: 'test',
      email: 'test@test.test',
      password: 'Test1test',
      password_confirmation: 'Test1test'
    });
    expect(response).toStrictEqual(fakeResponse);
  });
  
  it('should return err', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse);

    const response = await registerAdmin({});
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return server out', async () =>{
    mockFetch({});

    const response = await registerAdmin({});
    expect(response).toStrictEqual({err: 'server out'});
  });
});