import jwt from 'jsonwebtoken';

import checkAccessToken from '../../../helpers/checkAccessToken';

describe('it tests checkAccessToken', () =>{
  
  it('should return true', () =>{
    const jwtTest = jwt.sign({name: 'test'}, 'test', {expiresIn: '1d'});
    expect(checkAccessToken(jwtTest)).toBe(true);
  });

  describe('it should return false', () =>{
    test('empty accessToken', () =>{
      expect(checkAccessToken('')).toBe(false);
    });

    test('expired accessToken', () =>{
      const jwtTest = jwt.sign({name: 'test'}, 'test', {expiresIn: '1'});
      expect(checkAccessToken(jwtTest)).toBe(false);
    });
  });
});