import request from "supertest";
import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

describe('test payment route', () =>{
  let accessToken = '';
  let refreshToken = '';
  let userId = '';

  beforeAll(async () =>{
    await MongoConnect();

    await request(app)
      .post('/api/admin/register')
      .send('name=test&email=test@test.test&password=Test1test&password_confirmation=Test1test')
    .then(res =>{
      accessToken = `Bearer ${res.body.accessToken}`;
      refreshToken = res.body.refreshToken;
    });

    await request(app)
      .post('/api/user')
      .send('name=test&email=test@test.test&plan=true')
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
    .then(res =>{
      userId = res.body.user._id;
    });
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });

  it('needs to change payment status to late', async () =>{
    await request(app)
      .put(`/api/payment/${userId}`)
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
      .expect(200)
    .then(res =>{
      expect(res.body).toStrictEqual({success: 'payment status updated'});
    });
  });
});