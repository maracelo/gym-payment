import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";
import genRandPhoneNum from "../../helpers/genRandPhoneNum";
import createUserFilter from "../../helpers/user/createUserFilter";
import User from "../../models/User";

describe('it should test createUserFilter function', () =>{

  beforeAll(async () =>{
    await MongoConnect();

    await User.create({name: 'test2', email: 'test2@test.test', plan: 'vip'});
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });

  it('should return user\'s fields', async () =>{
    const name = 'test', email = 'test@test.test', plan = 'false', phone = genRandPhoneNum();
    const data = {name, email, plan, phone};

    const filteredData: any = await createUserFilter(data);
    expect(filteredData.name).toBe(name);
    expect(filteredData.email).toBe(email);
    expect(filteredData.plan).toBe('normal');
    expect(filteredData.phone).toBe(phone);
  })

  describe('test invalid fields', () =>{

    describe('it should return invalid name', () =>{
      test('no name', async () =>{
        expect(await createUserFilter({name: ''})).toStrictEqual({err: 'Invalid name'});
      });

      test('one letter', async () =>{
        expect(await createUserFilter({name: 'a'})).toStrictEqual({err: 'Invalid name'});
      });
    });
  
    describe('it should return invalid email', () =>{
      let data: any = {name: 'test'};

      test('no email', async () =>{
        data.email = '';
        expect(await createUserFilter(data)).toStrictEqual({err: 'Invalid email'});
      });

      data.email = 'testtest.test';

      test('invalid email', async () =>{
        expect(await createUserFilter(data)).toStrictEqual({err: 'Invalid email'});
      });
    });

    it('should return existing email', async () =>{
      const data = {name: 'test', email: 'test2@test.test', plan: 'vip'};
      
      expect(await createUserFilter(data)).toStrictEqual({err: 'Email already exists'});
    });
  
    describe('it should return invalid plan', () =>{
      let data: any = {name: 'test', email: 'test@test.test'};
      
      test('no plan', async () =>{
        data.plan = '';
        expect(await createUserFilter(data)).toStrictEqual({err: 'Invalid plan'});
      });

      test('boolean plan', async () =>{
        data.plan = true;
        expect(await createUserFilter(data)).toStrictEqual({err: 'Invalid plan'});
      })
    });
  
    it('should return invalid phone', async () =>{
      const data: any = {name: 'test', email: 'test@test.test', plan: 'true', phone: '5559011'};

      expect(await createUserFilter(data)).toStrictEqual({err: 'Invalid phone number'});
    });
  });
});