import { vi } from "vitest"; 

import mockFetch from "../../helpers/mockFetch";

import loginAdmin from "../../../helpers/loginAdmin";

describe('it tests loginAdmin', () =>{

  beforeAll(() =>{
    vi.clearAllMocks();
  });
  
  it('should return refresh and access tokens', async () =>{
    const fakeResponse = {refreshToken: 'refreshToken', accessToken: 'accessToken'}
    mockFetch(fakeResponse);

    const response = await loginAdmin({email: 'test@test.test', password: 'Test1test'});
    expect(response).toStrictEqual(fakeResponse);
  });
  
  it('should return err', async () =>{
    const fakeResponse = {err: 'Error test'};
    mockFetch(fakeResponse);

    const response = await loginAdmin({});
    expect(response).toStrictEqual(fakeResponse);
  });

  it('should return server out', async () =>{
    mockFetch({});

    const response = await loginAdmin({});
    expect(response).toStrictEqual({err: 'server out'});
  });
});