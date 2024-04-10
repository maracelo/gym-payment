import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";
import genRandPhoneNum from "../../helpers/genRandPhoneNum";
import updateUserFilter from "../../helpers/user/updateUserFilter";
import User from "../../models/User";

describe('it should test updateUserFilter function', () =>{
  let user: any;
  
  beforeAll(async () =>{
    await MongoConnect();
    
    user = await User.create({name: 'test', email: 'test@test.test', plan: 'vip'});
    await User.create({name: 'test2', email: 'test2@test.test', plan: 'vip'});
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });
  
  it('should return user\'s fields', async () =>{
    const name = 'test2', email = 'test3@test.test', plan = 'true', phone = genRandPhoneNum(); // first update fields
    const data = {name, email, plan, phone};

    const filteredData: any = await updateUserFilter(data, user);

    expect(filteredData.name).toBe(name);
    expect(filteredData.email).toBe(email);
    expect(filteredData.plan).toBe(plan);
    expect(filteredData.phone).toBe(phone);
  });

  it('should return empty obj ({})', async () =>{
    expect(await updateUserFilter({}, user)).toStrictEqual({});
  });

  describe('test invalid data', () =>{

    it('should return invalid name', async () =>{
      expect(await updateUserFilter({name: 'a'}, user)).toStrictEqual({err: 'Invalid name'});
    });

    it('should return invalid email', async () =>{
      let data = {email: 'testtest.test'};

      expect(await updateUserFilter(data, user)).toStrictEqual({err: 'Invalid email'});
    });

    it('should return existing email', async () =>{
      const data = {email: 'test2@test.test'};
      
      expect(await updateUserFilter(data, user)).toStrictEqual({err: 'Email already exists'});
    });
  
    it('should return invalid plan', async () =>{
      let data: any = {plan: true};

      expect(await updateUserFilter(data, user)).toStrictEqual({err: 'Invalid plan'});
    });
  
    it('should return invalid phone', async () =>{
      const data: any = {phone: '5559011'};

      expect(await updateUserFilter(data, user)).toStrictEqual({err: 'Invalid phone number'});
    });
  });
});