import request from "supertest";
import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

describe('test refresh route', () =>{
  let accessToken = '';
  let refreshToken = '';

  beforeAll(async () =>{
    await MongoConnect();

    await request(app)
      .post('/api/admin/register')
      .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
    .then(res =>{
      accessToken = `Bearer ${res.body.accessToken}`;
      refreshToken = res.body.refreshToken;
    });
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });

  it('need to return accessToken', async () =>{
    await request(app)
      .get('/api/refresh')
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
      .expect(200)
    .then(res =>{
      expect(res.body.accessToken).toBeDefined();
    });
  });
});