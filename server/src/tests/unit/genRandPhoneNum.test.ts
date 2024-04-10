import genRandPhoneNum from "../../helpers/genRandPhoneNum";

describe('it should test genRandPhoneNum function', () =>{
  it('should return a valid number', () =>{
    const randPhoneNum = genRandPhoneNum();
    console.log(randPhoneNum)

    expect(randPhoneNum).toMatch(/5584[0-9]{9}/);
  });
});