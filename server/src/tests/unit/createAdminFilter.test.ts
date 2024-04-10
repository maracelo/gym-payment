import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";
import createAdminFilter from "../../helpers/admin/createAdminFilter";
import genRandPhoneNum from "../../helpers/genRandPhoneNum";
import Admin from "../../models/Admin";

describe('it should test createAdminFilter function', () =>{

  beforeAll(async () =>{
    await MongoConnect();

    await Admin.create({
      name: 'test2',
      email: 'test2@test.test',
      plan: 'vip',
      password: 'Test1test',
      password_confirmation: 'Test1test'
    });
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });

  it('should return user\'s fields', async () =>{
    const name = 'test', email = 'test@test.test', phone = genRandPhoneNum(), password = 'Test1test';
    const data = {name, email, phone, password, password_confirmation: password};

    const filteredData: any = await createAdminFilter(data);
    expect(filteredData.name).toBe(name);
    expect(filteredData.email).toBe(email);
    expect(filteredData.phone).toBe(phone);
    expect(filteredData.password).toBeDefined();
  })

  describe('test invalid fields', () =>{

    describe('it should return invalid name', () =>{
      test('no name', async () =>{
        expect(await createAdminFilter({name: ''})).toStrictEqual({err: 'Invalid name'});
      });

      test('one letter', async () =>{
        expect(await createAdminFilter({name: 'a'})).toStrictEqual({err: 'Invalid name'});
      });
    });
  
    describe('it should return invalid email', () =>{
      let data: any = {name: 'test'};

      test('no email', async () =>{
        data.email = '';
        expect(await createAdminFilter(data)).toStrictEqual({err: 'Invalid email'});
      });

      data.email = 'testtest.test';

      test('invalid email', async () =>{
        expect(await createAdminFilter(data)).toStrictEqual({err: 'Invalid email'});
      });
    });

    it('should return existing email', async () =>{
      const data = {name: 'test', email: 'test2@test.test'};
      
      expect(await createAdminFilter(data)).toStrictEqual({err: 'Email already exists'});
    });
  
    it('should return invalid phone', async () =>{
      const data: any = {
        name: 'test',
        email: 'test@test.test',
        password: 'Test1test',
        password_confirmation: 'Test1test',
        phone: '5559011'
      };

      expect(await createAdminFilter(data)).toStrictEqual({err: 'Invalid phone number'});
    });


    describe('it should return invalid password', () =>{
      const data: any = {
        name: 'test',
        email: 'test@test.test',
        password: 'Tes',
        password_confirmation: 'Tes',
      };

      const errMsg = {err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'};

      test('invalid password', async () =>{
        expect(await createAdminFilter(data)).toStrictEqual(errMsg);
      });

      data.password = 'Test1test';
      data.password_confirmation = 'te';

      test('invalid password_confirmation', async () =>{
        expect(await createAdminFilter(data)).toStrictEqual(errMsg);
      });

      data.password_confirmation = 'Test2test';

      test('different passwords', async () =>{
        expect(await createAdminFilter(data)).toStrictEqual(errMsg);
      });
      
      data.password = '';
      data.password_confirmation = '';

      test('no password', async () =>{
        expect(await createAdminFilter(data)).toStrictEqual(errMsg);
      });
    });
  });
});