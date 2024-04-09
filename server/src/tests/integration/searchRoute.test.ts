import request from "supertest";
import app from "../../app";
import { MongoClear, MongoConnect, MongoDisconnect } from "../../database/mongo";

describe('test payment route', () =>{
  let accessToken = '';
  let refreshToken = '';
  let firstUserId = '';
  let secondUserId = '';

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
      firstUserId = res.body.user._id;
    });

    await request(app)
      .post('/api/user')
      .send('name=test2&email=test2@test.test&plan=true')
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
    .then(res =>{
      secondUserId = res.body.user._id;
    });
  });

  afterAll(async () =>{
    await MongoClear();
    await MongoDisconnect();
  });

  it('needs to get only one user', async () =>{
    await request(app)
      .get('/api/search')
      .query({name: 'test2'})
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
      .expect(200)
    .then(res =>{
      expect(res.body.users.length).toEqual(1);
      expect(res.body.users[0]._id).toBe(secondUserId);
    });
  });

  it('needs to get two users', async () =>{
    await request(app)
      .get(`/api/search`)
      .query('name=test')
      .set('Authorization', accessToken)
      .set('Refresh-Token', refreshToken)
      .expect(200)
    .then(res =>{
      expect(res.body.users.length).toEqual(2);
    });
  });

  describe('it gets no user', () =>{

    it('needs to return empty name', async () =>{
      await request(app)
        .get(`/api/search`)
        .query('name=')
        .set('Authorization', accessToken)
        .set('Refresh-Token', refreshToken)
        .expect(400)
      .then(res =>{
        expect(res.body.err).toBe('Name is empty');
      });
    });

    it('needs to return no user', async () =>{
      await request(app)
        .get(`/api/search`)
        .query('name=a')
        .set('Authorization', accessToken)
        .set('Refresh-Token', refreshToken)
        .expect(404)
      .then(res =>{
        expect(res.body.err).toBe('Nothing found');
      });
    });
  });
});