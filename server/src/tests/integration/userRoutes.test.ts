import request from "supertest";

import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

import genRandPhoneNum from '../../helpers/genRandPhoneNum';

describe("test user's routes", () =>{
    let firstUserId = '';

    beforeAll(async () =>{
        await MongoConnect();
    });

    afterAll(async () =>{
        await MongoClear();
        await MongoDisconnect();
    });

    it('should create a user', async () =>{
        await request(app)
            .post('/api/user')
            .send('name=test&email=test@test.test&plan=vip')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(201)
        .then(res =>{ firstUserId = res.body._id });
    });

    it('should get created user', async () =>{
        await request(app)
            .get(`/api/user/${firstUserId}`)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
        .then(res =>{ expect(res.body.email).toBe('test@test.test') });
    });

    describe('it should not create an user', () =>{

        test('existing email', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test@test.test&plan=vip')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });

        test('wrong email', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=t@test.test&plan=vip')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) })
        });

        test('wrong name', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=t&email=test2@test.test&plan=vip')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) })
        });

        test('wrong plan', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test2@test.test&plan=test')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid plan'}) })
        });

        test('wrong phone', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test2@test.test&plan=vip&phone=0')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) })
        });
    });

    it('should add another user', async () =>{
        await request(app)
            .post('/api/user')
            .send('name=test2&email=test2@test.test&plan=normal&phone=+5584900000000')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(201)
    });
   
    it('should get 2 users', async () =>{
        await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
        .then(res =>{ expect(res.body.users.length).toBe(2) })
    });

    describe('it should update user', () =>{

        test('update name', async () =>{
            const name = 'testing';

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`name=${name}`)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.name).toBe(name) });
        });

        test('update email', async () =>{
            const email = 'testt@test.test';

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`email=${email}`)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.email).toBe(email) });
        });

        test('update plan', async () =>{
            const plan = 'normal';

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`plan=${plan}`)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.plan).toBe(plan) })
        });

        test('update phone', async ()=>{
            let phone = genRandPhoneNum();

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`phone=${phone}`)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.phone).toBe(phone) })
        });
    });

    describe('it should not update user', () =>{
        
        test('wrong name', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('name=t')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) });
        });
        
        test('wrong email', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('email=t')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) });
        });

        test('existing email', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('email=test2@test.test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });
        
        test('wrong plan', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('plan=t')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid plan'}) });
        });
        
        test('wrong phone', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('phone=0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) });
        })
    });

    describe('it should delete user', () =>{

        it('should delete user', async () =>{
            await request(app)
                .delete(`/api/user/${firstUserId}`)
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body).toStrictEqual({success: 'User deleted'}) });
        });

        it('should not find user', async () =>{
            await request(app)
                .get(`/api/user/${firstUserId}`)
                .expect(404)
            .then(res =>{ expect(res.body).toStrictEqual({ err: 'User not found' }) })
        })
    });

});