import request from "supertest";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

import genRandPhoneNum from "../../helpers/genRandPhoneNum";

dotenv.config();

describe('test admin\'s routes', () =>{
    let accessToken = '';
    let refreshToken = '';
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
            try{
                accessToken = `Bearer ${res.body.accessToken}`;
                refreshToken = res.body.refreshToken;
                const decoded = jwt.verify(res.body.accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;
                firstAdminId = decoded.adminId ?? '';
            }catch(err){
                throw Error(err as string);
            }
        });
    });

    it('should get created admin', async () =>{
        await request(app)
            .get(`/api/admin/${firstAdminId}`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .expect('Content-Type', /json/)
            .expect(200)
        .then(res =>{ expect(res.body.admin.email).toBe('test@test.test') });
    });

    it('should make login', async () =>{
        await request(app)
            .post('/api/admin/login')
            .send('email=test@test.test&password=Test1test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        .then(res =>{
            try{
                jwt.verify(res.body.accessToken, process.env.ACCESS_TOKEN_SECRET as string) as any;
                jwt.verify(res.body.refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as any;
                accessToken = `Bearer ${res.body.accessToken}`;
                refreshToken = res.body.refreshToken;
            }catch(err){
                console.log(err);
                throw Error('JWT Error');
            }
        });
    })

    describe('it should not create an admin', ()=>{
        
        test('wrong name', async () =>{
            await request(app)
                .post('/api/admin/register')
                .send('name=t')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) });
        });
        
        test('wrong email', async () =>{
            await request(app)
                .post('/api/admin/register')
                .send('name=test&email=t&password=Test1test&password_confirmation=Test1test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) });
        });

        test('existing email', async () =>{
            await request(app)
                .post('/api/admin/register')
                .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) });
        });

        test('wrong password', async () =>{
            await request(app)
                .post('/api/admin/register')
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
                .post('/api/admin/register')
                .send('name=test&email=test2@test.test&password=Test2test&password_confirmation=Test2test&phone=0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) });
        });
    });

    it('should add another admin', async () =>{
        await request(app)
            .post('/api/admin/register')
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
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.admin.name).toBe(name) });
        });

        test('update email', async () =>{
            const email = 'test3@test.test';

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`email=${email}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.admin.email).toBe(email) })
        });

        test('update password', async () =>{
            const new_password = 'Test2test';
            const current_password = 'Test1test';

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`new_password=${new_password}&current_password=${current_password}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{
                expect(bcrypt.compareSync(new_password, res.body.admin.password)).toBe(true);
            });
        });

        test('update phone', async () =>{
            const phone = genRandPhoneNum();

            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send(`phone=${phone}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body.admin.phone).toBe(phone) })
        });
    });

    describe('it should not update admin', () =>{

        test('wrong name', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('name=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid name'}) })
        });

        test('wrong email', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('email=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid email'}) })
        });

        test('existing email', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('email=test2@test.test')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Email already exists'}) })
        });

        test('wrong password', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}`)
                .send('new_password=t&current_password=t')
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
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
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
            .then(res =>{ expect(res.body).toStrictEqual({err: 'Invalid phone number'}) })
        });
    });

    it('should change profile pic', async () =>{
        let profilePicName = '';

        await request(app)
            .put(`/api/admin/${firstAdminId}/newpic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .attach('newPic', path.join(__dirname, 'testFiles/testImage.jpg'))
        .then(res =>{
            expect(res.body.admin.email).toBe('test3@test.test');
            expect(res.body.admin.profile_pic).toBeDefined();
            profilePicName = res.body.admin.profile_pic;
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
            .get(`/api/admin/${firstAdminId}`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
        .then(res =>{
            oldProfilePicName = res.body.admin.profile_pic;
        });

        await request(app)
            .put(`/api/admin/${firstAdminId}/newpic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
            .attach('newPic', path.join(__dirname, 'testFiles/testImage.jpg'))
        .then(res =>{
            expect(res.body.admin.email).toBe('test3@test.test');
            expect(res.body.admin.profile_pic).toBeDefined();
            profilePicName = res.body.admin.profile_pic;
        });
        
        const file = fs.existsSync(path.join(__dirname, `../../../public/media/images/${profilePicName}`));
        expect(file).toBe(true);
        const oldFile = fs.existsSync(path.join(__dirname, `../../../public/media/images/temp/${oldProfilePicName}`));
        expect(oldFile).toBe(false);
    });

    it('should remove profile pic', async () =>{
        let profilePicName = 'default_profile_pic.jpg'

        await request(app)
            .put(`/api/admin/${firstAdminId}/removepic`)
            .set('Authorization', accessToken)
            .set('Refresh-Token', refreshToken)
            .set('Accept', 'application/json')
        .then(res =>{
            expect(res.body.admin.profile_pic).toBe(profilePicName);
        });

        const file = fs.existsSync(path.join(__dirname, `../../../public/media/images/${profilePicName}`));
        expect(file).toBe(true);
        const tempFile = fs.existsSync(path.join(__dirname, `../../../public/media/images/temp/${profilePicName}`));
        expect(tempFile).toBe(false);
    });

    describe('it should not change profile pic', ()=>{

        it('should not accept a txt file', async () =>{
            await request(app)
                .put(`/api/admin/${firstAdminId}/newpic`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
                .attach('newPic', path.join(__dirname, 'testFiles/text.txt'))
            .then(res =>{
                expect(res.body).toStrictEqual({err: 'Profile pic wasn\'t sent'});
            });
    
            await request(app)
                .get(`/api/admin/${firstAdminId}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
            .then(res =>{
                const profilePic = res.body.admin.profile_pic;
    
                expect(profilePic).toBe('default_profile_pic.jpg');
    
                const tempFile = fs.existsSync(`../public/media/images/temp/${profilePic}`);
                expect(tempFile).toBe(false);
            });
        });

        it('should return profile pic not sent', async ()=>{
            await request(app)
                .put(`/api/admin/${firstAdminId}/newpic`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .set('Accept', 'application/json')
            .then(res =>{
                expect(res.body).toStrictEqual({err: 'Profile pic wasn\'t sent'});
            });
        });
    });

    describe('it should delete admin', () =>{
        it('should delete admin', async () =>{
            await request(app)
                .delete(`/api/admin/${firstAdminId}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
                .send('password=Test2test')
                .expect('Content-Type', /json/)
                .expect(200)
            .then(res =>{ expect(res.body).toStrictEqual({success: 'Admin deleted'}) });
        });

        it('should login in the other admin', async () =>{
            await request(app)
                .post('/api/admin/login')
                .send('email=test2@test.test&password=Test1test')
                .set('Accept', 'application/json')
            .then((res) =>{
                accessToken = `Bearer ${res.body.accessToken}`;
                refreshToken = res.body.refreshToken;
                expect(accessToken).not.toBeUndefined();
            });
        })
    
        it('should not find admin', async () =>{ // make login in another account and check if user exists in db
            await request(app)
                .get(`/api/admin/${firstAdminId}`)
                .set('Authorization', accessToken)
                .set('Refresh-Token', refreshToken)
            .expect(404);
        });
    });
});