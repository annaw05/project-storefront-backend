import app from '../../server';
import supertest from  'supertest';
import { UserStore, User } from '../../models/user';

const request = supertest(app);

/*
- Index [token required]: '/users' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: '/users' [POST]
*/
const store = new UserStore();
let token: string;

describe('------ testing user endpoints ------', ()=>{
    const testuser1: User = {
        id:1,
        username:'testUsername1',
        firstname: 'John',
        lastname: 'Doe',
        password: 'testpassword',
      }
    
      const testuser2: User = {
        id:2,
        username:'testUsername2',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'testpassword2' ,
      }
    
    //post user to get token from response body to use in tests
    beforeAll(async()=>{
        const userRequest =await request
        .post('/users')
        .send(testuser2)
        // to get response in JSON
        .set('Accept', 'application/json');
        
        token = userRequest.body;
    });
       
    
    it('CREATE endpoint: /users [POST] ', async () => {
      const response = await request
        .post('/users')
        .send(testuser1)
    
    expect(response.status).toBe(200);
    
    });

    it('INDEX endpoint: /users [GET]', async()=>{
        const response = await request
        .get('/users')
        .set(`authorization`,`Bearer ${token}`);
        expect(response.status).toBe(200);
    })

    it('SHOW endpoint: /users/:id [GET]', async()=>{
        const response = await request
        .get('/users/2')
        .set(`authorization`,`Bearer ${token}`);
        expect(response.status).toBe(200);
    })

    afterAll(async()=>{
        await store.cleanTableUsers();
    })

})