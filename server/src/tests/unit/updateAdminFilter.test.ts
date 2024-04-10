import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";
import updateAdminFilter from "../../helpers/admin/updateAdminFilter";
import genRandPhoneNum from "../../helpers/genRandPhoneNum";
import Admin from "../../models/Admin";
import bcrypt from "bcrypt";

describe('it should test updateAdminFilter function', () =>{
  let admin: any;
  
  beforeAll(async () =>{
    await MongoConnect();

    admin = await Admin.create({
      name: 'test',
      email: 'test@test.test',
      plan: 'vip',
      password: bcrypt.hashSync('Test1test', 10)
    });
    await Admin.create({
      name: 'test2',
      email: 'test2@test.test',
      plan: 'vip',
      password: bcrypt.hashSync('Test1test', 10),
    });
  });
  
  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });
  
  it('should return user\'s fields', async () =>{
    const name = 'test3', email = 'test3@test.test', phone = genRandPhoneNum(), password = 'Test3test';
    const data = {name, email, phone, new_password: password, current_password: 'Test1test'};

    const filteredData: any = await updateAdminFilter(data, admin);
    console.log(filteredData);
    expect(filteredData.name).toBe(name);
    expect(filteredData.email).toBe(email);
    expect(filteredData.phone).toBe(phone);
    expect(filteredData.password).toBeDefined();
  })

  it('should return empty obj ({})', async () =>{
    expect(await updateAdminFilter({}, admin)).toStrictEqual({});
  });

  describe('test invalid fields', () =>{

    it('should return invalid name', async () =>{
      expect(await updateAdminFilter({name: 't'}, admin)).toStrictEqual({err: 'Invalid name'});
    });
  
    it('should return invalid email', async () =>{
      expect(await updateAdminFilter({email: 'testtest.test'}, admin)).toStrictEqual({err: 'Invalid email'});
    });

    it('should return existing email', async () =>{
      expect(await updateAdminFilter({email: 'test2@test.test'}, admin)).toStrictEqual({err: 'Email already exists'});
    });
  
    it('should return invalid phone', async () =>{
      expect(await updateAdminFilter({phone: '5559011'}, admin)).toStrictEqual({err: 'Invalid phone number'});
    });

    describe('it should return invalid password', () =>{
      const data: any = {new_password: 'Test1test', current_password: 'Test1test'};

      const errMsg = {err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'};

      test('invalid current password', async () =>{
        expect(await updateAdminFilter(data, admin)).toStrictEqual(errMsg);
      });

      data.new_password = 'te';
      data.current_password = 'Test2test';

      test('invalid new_password', async () =>{
        expect(await updateAdminFilter(data, admin)).toStrictEqual(errMsg);
      });
    });
  });
});