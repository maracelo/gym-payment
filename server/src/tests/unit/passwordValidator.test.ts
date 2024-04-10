import passwordValidator from "../../helpers/passwordValidator";

describe('it should test password validator', () =>{

  it('needs to return true', () =>{
    const password = 'Test1test';

    expect(passwordValidator(password)).toBe(true);
  });

  describe('needs to return false', () =>{
    
    test('lefting number', () =>{
      const password = 'Testttest';

      expect(passwordValidator(password)).toBe(false);
    });

    test('lefting uppercase letter', () =>{
      const password = 'test1test';

      expect(passwordValidator(password)).toBe(false);
    });

    test('lefting characters', () =>{
      const password = 'Te1';

      expect(passwordValidator(password)).toBe(false);
    });

    test('overpassing the max number of characters', () =>{
      let password = 'Test1test';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(let i = 0; i < 97; i++){
        let random = Math.floor( Math.random() * characters.length - 1 );
        password += characters[random];
      }

      expect(passwordValidator(password)).toBe(false);
    });
  });
});