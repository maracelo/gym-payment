import phoneValidator from "../../helpers/phoneValidator";

describe('it should test phone validator', () =>{

  describe('should return filtered phone', () =>{
    test('with everything', () =>{
      const phone = '+55 (84) 9 0000-0000';
  
      expect(phoneValidator(phone)).toBe('+5584900000000');
    });

    test('with no dash, 9, parenthesis and spaces', () =>{
      const phone = '+5584900000000';
  
      expect(phoneValidator(phone)).toBe('+5584900000000');
    });
  });

  describe('should return invalid (null)', () =>{
    test('random string', () =>{
      const phone = '1+0a89fd28';
  
      expect(phoneValidator(phone)).toBe(null);
    });

    test('another country', () =>{
      const phone = '+10 (84) 9 0000-0000';
  
      expect(phoneValidator(phone)).toBe(null);
    });
  });
});