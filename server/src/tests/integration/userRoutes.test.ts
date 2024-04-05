import request from "supertest";

import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

import genRandPhoneNum from '../../helpers/genRandPhoneNum';

describe("test user's routes", () =>{
    let firstUserId = '';
    let accessToken = '';
    let refreshToken = '';

    beforeAll(async () =>{
        await MongoConnect();

        await request(app)
            .post('/api/admin/register')
            .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
        .then(res =>{
            accessToken = `Bearer ${res.body.accessToken}`
            refreshToken = res.body.refreshToken;
        });
    });

    afterAll(async () =>{
        await MongoClear();
        await MongoDisconnect();
    });

    it('should create a user', async () =>{
        await request(app)
            .post('/api/user')
            .send('name=test&email=test@test.test&plan=true')
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(201)
        .then(res =>{ firstUserId = res.body.user._id; });
    });
    
    it('should get created user', async () =>{
        await request(app)
            .get(`/api/user/${firstUserId}`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
        .then(res =>{ expect(res.body.user.email).toBe('test@test.test') });
    });

    describe('it should not create an user', () =>{

        test('existing email', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test@test.test&plan=true')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });

        test('wrong email', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=t@test.test&plan=true')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) })
        });

        test('wrong name', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=t&email=test2@test.test&plan=true')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) })
        });

        test('wrong plan', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test2@test.test&plan=test')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid plan'}) })
        });

        test('wrong phone', async () =>{
            await request(app)
                .post('/api/user')
                .send('name=test&email=test2@test.test&plan=true&phone=0')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) })
        });
    });

    it('should add another user', async () =>{
        await request(app)
            .post('/api/user')
            .send('name=test2&email=test2@test.test&plan=false&phone=+5584900000000')
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(201)
    });
   
    it('should get 2 users', async () =>{
        await request(app)
            .get('/api/usertoday')
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
        .then(res =>{ expect(res.body.todayUsers.length).toBe(2) })
    });

    describe('it should update user', () =>{

        test('update name', async () =>{
            const name = 'testing';

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`name=${name}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.user.name).toBe(name) });
        });

        test('update email', async () =>{
            const email = 'testt@test.test';

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`email=${email}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.user.email).toBe(email) });
        });

        test('update plan', async () =>{
            const plan = false;

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`plan=${plan}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.user.plan).toBe(plan.toString()) })
        });

        test('update phone', async ()=>{
            let phone = genRandPhoneNum();

            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send(`phone=${phone}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.user.phone).toBe(phone) })
        });
    });

    describe('it should not update user', () =>{
        
        test('wrong name', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('name=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) });
        });
        
        test('wrong email', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('email=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) });
        });

        test('existing email', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('email=test2@test.test')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });
        
        test('wrong plan', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('plan=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid plan'}) });
        });
        
        test('wrong phone', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}`)
                .send('phone=0')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
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
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .send('password=Test1test')
                .expect('Content-type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body).toStrictEqual({success: 'User deleted'}) });
        });

        it('should not find user', async () =>{
            await request(app)
                .get(`/api/user/${firstUserId}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .expect(404)
            .then(res =>{ expect(res.body).toStrictEqual({ err: 'User not found' }) })
        })
    });
});