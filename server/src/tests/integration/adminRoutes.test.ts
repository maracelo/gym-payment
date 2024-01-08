import request from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

import genRandPhoneNum from "../../helpers/genRandPhoneNum";

dotenv.config();

describe('test admin\'s routes', () =>{
    let firstAdminToken = '';
    let firstAdminId = '';

    beforeAll(async () =>{
        await MongoConnect();
    });

    afterAll(async () =>{
        await MongoClear();
        await MongoDisconnect();
    });

    it('should create an admin', async () =>{
        await request(app)
            .post('/api/admin/register')
            .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
        .then(res =>{
            let token = jwt.verify(res.body.token, process.env.JWT_SECRET as string) as any;
            firstAdminToken = res.body.token;
            firstAdminId = token.id ?? '';
        });
    });

    it('should get created admin', async () =>{
        await request(app)
            .get(`/api/admin/${firstAdminId}`)
            .set('Authorization', 'Bearer ' + firstAdminToken)
            .expect('Content-Type', /json/)
            .expect(200)
        .then(res => expect(res.body.email).toBe('test@test.test'));
    });

    /* it('should make login', async () =>{
        await request(app)
            .post('/api/admin/login')
            .send('name=test&email=test@test.test')
            .set('Accept', 'application/json')
            .expect('Content', /json/)
            .expect(200)
        .then(res =>{
            try{
                jwt.verify(res.body.token, process.env.JWT_SECRET as string) as any;
            }catch(err){
                console.log(err);
            }
        });
    })

    describe('it should not create an admin', ()=>{
        
        test('wrong name', async () =>{
            await request(app)
                .post('/api/register')
                .send('name=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) });
        });
        
        test('wrong email', async () =>{
            await request(app)
                .post('/api/register')
                .send('name=test&email=t&password=Test1test&password_confirmation=Test1test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) });
        });

        test('existing email', async () =>{
            await request(app)
                .post('/api/register')
                .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) });
        });

        test('wrong password', async () =>{
            await request(app)
                .post('/api/register')
                .send('name=test&email=test2@test.test&password=t&password_confirmation=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{
                expect(res.body)
                    .toStrictEqual({
                        err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'
                    });
            });
        });

        test('wrong phone', async () =>{
            await request(app)
                .post('/api/register')
                .send('name=test&email=test2@test.test&password=Test2test&password_confirmation=Test2test&phone=0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) });
        });
    });

    it('should add another admin', async () =>{
        await request(app)
            .post('/api/register')
            .send('name=test&email=test2@test.test&password=Test1test&password_confirmation=Test1test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        .expect(201)
    });

    describe('it should update admin', () =>{

        test('update name', async () =>{
            const name = 'testing';

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`name=${name}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.name).toBe(name) })
        });

        test('update email', async () =>{
            const email = 'test3@test.test';

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`email=${email}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.email).toBe(email) })
        });

        test('update password', async () =>{
            const new_password = 'Test2test';
            const current_password = 'Test1test';

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`new_password=${new_password}&current_password=${current_password}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{
                expect(bcrypt.compareSync(new_password, res.body.password)).toBe(true);
            });
        });

        test('update phone', async () =>{
            const phone = genRandPhoneNum();

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`phone=${phone}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.phone).toBe(phone) })
        });
    });

    describe('it should not update admin', () =>{

        test('wrong name', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('name=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) })
        });

        test('wrong email', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('email=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) })
        });

        test('existing email', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('email=test2@test.test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });

        test('wrong password', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('new_password=t&current_password=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ 
                expect(res.body).toStrictEqual({
                    err: 'Password need at least 8 characters, 1 digit, 1 upper and lowercase and max 100 characters'
                });
            });
        });

        test('wrong phone', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('phone=0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) })
        });
    });

    describe('it should delete admin', () =>{
        it('should delete admin', async () =>{
            await request(app)
                .delete(`/api/admin/${firstAdminId}`)
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body).toStrictEqual({success: 'Admin deleted'}) });
        });
    
        it('should not find admin', async () =>{
            await request(app)
                .get(`/api/admin/${firstAdminId}`)
                .expect('Content-Type', /json/)
                .expect(404)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Admin not found'}) })
        });
    }); */
});