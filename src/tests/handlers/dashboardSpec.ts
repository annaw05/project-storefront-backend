import app from '../../server';
import supertest from  'supertest';
import { OrderStore, Order } from '../../models/order';
import { UserStore, User } from '../../models/user';

const request = supertest(app);


/*
#### Orders
- Current Order by user (args: user id)[token required]: '/order-by-user/:user-id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/completed-orders/:user-id' [GET]
- [OPTIONAL] Top 5 most popular products:  '/top-5-products' [GET]
- [OPTIONAL] Products by category (args: product category): '/products-by-category/:category' [GET]
*/

fdescribe('------ testing order endpoints ------', ()=>{
    const userData = new UserStore();
    const orderData = new OrderStore();
    
    let token: string;

    beforeAll(async () => {
      //create users to test create order
      const testuser1: User = {
        id:1,
        username: 'testUsername1',
        firstname: 'John',
        lastname: 'Doe',
        password: 'testpassword'
      };

      const testuser2: User = {
        id: 2,
        username: 'testUsername2',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'testpassword2'
      };

      await userData.create(testuser1);
      await userData.create(testuser2);

      const order123: Order = {
        user_id: 1,
        order_status: true
      };

      const order124: Order = {
        user_id: 2,
        order_status: false
      };

      await orderData.create(order123);
      await orderData.create(order124);

      const userRequest =await request
        .post('/users')
        .send(testuser2)
        // to get response in JSON
        .set('Accept', 'application/json');
        
        token = userRequest.body;
    });
     


    it('ORDER by USER endpoint: /order-by-user/:user-id [GET] ', async()=>{
        const response = await request
        .get('/orders/current/1');
        expect(response.status).toBe(200);
    })

    it('COMPLETED ORDER BY USER endpoint: /completed-orders/:user-id [GET] ', async()=>{
        const response = await request
        .get('/order-by-user/2')
        .set(`Authorization`, `Bearer ${token}`)
        expect(response.status).toBe(200);
    })

    it('fails COMPLETED ORDER BY USER endpoint: /completed-orders/:user-id [GET] ', async()=>{
        token=token+'ghda';
        const response = await request
        .get('/order-by-user/2')
        .set(`Authorization`, `Bearer ${token}`)
        expect(response.status).toBe(400);
    })

})
