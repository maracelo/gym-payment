import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

import genRandPhoneNum from '../../helpers/genRandPhoneNum';

describe("test user's routes", () =>{
    let firstUserId = '';
    let secondUserId = '';
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
        .then(res =>{secondUserId = res.body.user._id})
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
            const email = 'test3@test.test';

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

    it('should change profile pic', async () =>{
        let profilePicName = '';

        await request(app)
            .put(`/api/user/${firstUserId}/newpic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .attach('newPic', path.join(__dirname, 'testFiles/testImage.jpg'))
        .then(res =>{
            expect(res.body.user.email).toBe('test3@test.test');
            expect(res.body.user.profile_pic).toBeDefined();
            profilePicName = res.body.user.profile_pic;
        });

        const file = fs.existsSync(path.join(__dirname, `../../../public/media/images/${profilePicName}`));
        expect(file).toBe(true);
        const tempFile = fs.existsSync(path.join(__dirname, `../../../public/media/images/temp/${profilePicName}`));
        expect(tempFile).toBe(false);
    });

    it('should update and delete old profile pic', async () =>{
        let oldProfilePicName = '';
        let profilePicName = '';

        await request(app)
            .get(`/api/user/${firstUserId}`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
        .then(res =>{
            oldProfilePicName = res.body.user.profile_pic;
        });

        await request(app)
            .put(`/api/user/${firstUserId}/newpic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .attach('newPic', path.join(__dirname, 'testFiles/testImage.jpg'))
        .then(res =>{
            expect(res.body.user.email).toBe('test3@test.test');
            expect(res.body.user.profile_pic).toBeDefined();
            profilePicName = res.body.user.profile_pic;
        });
        
        const file = fs.existsSync(path.join(__dirname, `../../../public/media/images/${profilePicName}`));
        expect(file).toBe(true);
        const oldFile = fs.existsSync(path.join(__dirname, `../../../public/media/images/temp/${oldProfilePicName}`));
        expect(oldFile).toBe(false);
    });

    it('should remove profile pic', async () =>{
        let profilePicName = 'default_profile_pic.jpg'

        await request(app)
            .put(`/api/user/${firstUserId}/removepic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
        .then(res =>{
            expect(res.body.user.profile_pic).toBe(profilePicName);
        });

        const file = fs.existsSync(path.join(__dirname, `../../../public/media/images/${profilePicName}`));
        expect(file).toBe(true);
        const tempFile = fs.existsSync(path.join(__dirname, `../../../public/media/images/temp/${profilePicName}`));
        expect(tempFile).toBe(false);
    });

    describe('it should not change profile pic', ()=>{

        it('should not accept a txt file', async () =>{
            await request(app)
                .put(`/api/user/${firstUserId}/newpic`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .attach('newPic', path.join(__dirname, 'testFiles/text.txt'))
            .then(res =>{
                expect(res.body).toStrictEqual({err: 'Profile pic wasn\'t sent'});
            });
    
            await request(app)
                .get(`/api/user/${firstUserId}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
            .then(res =>{
                const profilePic = res.body.user.profile_pic;
    
                expect(profilePic).toBe('default_profile_pic.jpg');
    
                const tempFile = fs.existsSync(`../public/media/images/temp/${profilePic}`);
                expect(tempFile).toBe(false);
            });
        });

        it('should return profile pic not sent', async ()=>{
            await request(app)
                .put(`/api/user/${firstUserId}/newpic`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
            .then(res =>{
                expect(res.body).toStrictEqual({err: 'Profile pic wasn\'t sent'});
            });
        });
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